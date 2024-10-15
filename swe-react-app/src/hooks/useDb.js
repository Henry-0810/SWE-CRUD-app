import { useEffect, useMemo, useState } from "react";
import PouchDb from "pouchdb-browser";

const dbUsername = process.env.REACT_APP_DB_UNAME;
const dbPassword = process.env.REACT_APP_DB_PASSWORD;
const remoteURL = process.env.REACT_APP_DB_URL;
const fullRemoteURL = `http://${dbUsername}:${dbPassword}@${remoteURL}`;

export default function useDb() {
  const [alive, setAlive] = useState(false);
  const [ready, setReady] = useState(false);

  const localDB = useMemo(() => new PouchDb("swe-db"), []);
  const remoteDB = useMemo(() => new PouchDb(fullRemoteURL), []);

  useEffect(() => {
    const canceller = localDB
      .sync(remoteDB, {
        live: true,
        retry: true,
      })
      .on("complete", () => setReady(true))
      .on("error", (err) => {
        setReady(false);
        console.log("Sync error:", err);
      });

    return () => canceller.cancel();
  }, [localDB, remoteDB]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      remoteDB
        .info()
        .then((info) => {
          setAlive(true);
          console.log("Remote DB is alive:", info);
        })
        .catch((error) => {
          setAlive(false);
          console.log("Error accessing remote DB:", error);
        });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [remoteDB]);

  return { db: localDB, ready, alive };
}
