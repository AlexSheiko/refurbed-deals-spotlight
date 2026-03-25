import { useEffect, useState } from "react";
import type { Deal } from "../data/model/Deal";
import { dealsRepository } from "../data/repository/DealsRepository";

type DealsState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; deals: Deal[] };

export const useDeals = () => {
  const [state, setState] = useState<DealsState>({ status: "loading" });

  useEffect(() => {
    dealsRepository
      .fetchDeals()
      .then((deals) => setState({ status: "success", deals }))
      .catch((e) => setState({ status: "error", error: e.message }));
  }, []);

  return state;
};
