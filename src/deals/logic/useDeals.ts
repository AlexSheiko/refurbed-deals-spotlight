import { useEffect, useState } from "react";
import type { Deal } from "../data/model/Deal";
import { dealsRepository } from "../data/repository/DealsRepository";

type DealsState =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "success"; deals: Deal[] }
  | { status: "error"; errorMessage: string };

export const useDeals = () => {
  const [state, setState] = useState<DealsState>({ status: "initial" });

  const onScreenOpened = async () => {
    setState({ status: "loading" });
    try {
      const deals = await dealsRepository.fetchDeals();
      setState({ status: "success", deals });
    } catch (e) {
      setState({
        status: "error",
        errorMessage: e instanceof Error ? e.message : "Unknown error",
      });
    }
  };

  const onScreenClosed = () => {
    setState({ status: "initial" });
  };

  useEffect(() => {
    onScreenOpened();
    return () => onScreenClosed();
  }, []);

  return state;
};
