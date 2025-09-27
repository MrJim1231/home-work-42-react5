import { useState, useEffect } from "react";
import type { UserInterface } from "../types/User.interface";
import { fetchData } from "../utils/api";

const DataFetcher = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndHandleLoading();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Завантаження даних...</span>
        </div>
        <p className="mt-3 fs-3 text-success">Завантаження даних...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="fs-3 text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFetcher;
