import { useEffect, useState, useCallback } from "react";

export default function useSalaries(db, isReady) {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  const fetchData = useCallback(() => {
    if (!isReady || !db) return;
    setLoading(true);

    db.query("Salary/byCompany", {
      include_docs: true,
    })
      .then((result) => {
        setLoading(false);
        setDocs(result.rows.map((row) => row.doc));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [db, isReady]);

  useEffect(() => {
    if (!isReady || !db) return;
    fetchData();

    const canceler = db
      .changes({
        since: "now",
        live: true,
      })
      .on("change", () => {
        fetchData();
      });

    return () => {
      canceler.cancel();
    };
  }, [db, isReady, fetchData]);

  return { loading, docs };
}
