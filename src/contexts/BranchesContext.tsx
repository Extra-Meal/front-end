import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router";

type Position = {
  lat: number;
  lng: number;
};

type Branch = {
  cityName: string;
  countryName: string;
  detailedAddress: string;
  famousDish: string;
  position: Position;
};

type State = {
  branches: Branch[];
  currentBranch: Branch | null;
  isDisplayDetails: boolean;
};

type Action = {
  type: "branch/selected" | "branches/removeDeails" | "branches/all";
  payload: Position;
};

const branches: Branch[] = [
  {
    cityName: "New York",
    countryName: "United States",
    position: { lat: 40.7128, lng: -74.006 },
    detailedAddress: "New York, NY, USA",
    famousDish: "New York-style pizza 🍕",
  },
  {
    cityName: "Tokyo",
    countryName: "Japan",
    position: { lat: 35.6895, lng: 139.6917 },
    detailedAddress: "Chiyoda City, Tokyo, Japan",
    famousDish: "Sushi 🍣",
  },
  {
    cityName: "Paris",
    countryName: "France",
    position: { lat: 48.8566, lng: 2.3522 },
    detailedAddress: "75000 Paris, France",
    famousDish: "Croissant 🥐",
  },
  {
    cityName: "Cairo",
    countryName: "Egypt",
    position: { lat: 30.0444, lng: 31.2357 },
    detailedAddress: "Tahrir Square, Cairo, Egypt",
    famousDish: "Koshari 🍲",
  },
  {
    cityName: "Rio de Janeiro",
    countryName: "Brazil",
    position: { lat: -22.9068, lng: -43.1729 },
    detailedAddress: "Copacabana, Rio de Janeiro, Brazil",
    famousDish: "Feijoada 🫘",
  },
  {
    cityName: "Sydney",
    countryName: "Australia",
    position: { lat: -33.8688, lng: 151.2093 },
    detailedAddress: "Sydney NSW 2000, Australia",
    famousDish: "Meat pie 🥧",
  },
  {
    cityName: "Moscow",
    countryName: "Russia",
    position: { lat: 55.7558, lng: 37.6173 },
    detailedAddress: "Red Square, Moscow, Russia",
    famousDish: "Borscht 🥄",
  },
  {
    cityName: "Toronto",
    countryName: "Canada",
    position: { lat: 43.651, lng: -79.347 },
    detailedAddress: "Downtown Toronto, ON, Canada",
    famousDish: "Poutine 🍟",
  },
  {
    cityName: "Cape Town",
    countryName: "South Africa",
    position: { lat: -33.9249, lng: 18.4241 },
    detailedAddress: "Cape Town City Centre, South Africa",
    famousDish: "Bobotie 🍛",
  },
  {
    cityName: "Dubai",
    countryName: "United Arab Emirates",
    position: { lat: 25.2048, lng: 55.2708 },
    detailedAddress: "Downtown Dubai, UAE",
    famousDish: "Shawarma 🌯",
  },
];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "branch/selected": {
      const found = state.branches.find(
        (branch) => branch.position.lat === action.payload.lat && branch.position.lng === action.payload.lng
      );
      return { ...state, currentBranch: found ?? null, isDisplayDetails: true };
    }

    case "branches/removeDeails":
      return { ...state, isDisplayDetails: false };

    case "branches/all":
      return { ...state, currentBranch: null, isDisplayDetails: false };
    default:
      throw new Error("Unknown action");
  }
}

// Provide proper typing for context value
type BranchesContextType = {
  branches: Branch[];
  currentBranch: Branch | null;
  isDisplayDetails: boolean;
  removeDetails: any;
  displayWholeBranches: any;
};

const BranchesContext = createContext<BranchesContextType | undefined>(undefined);

const initialState: State = {
  branches,
  currentBranch: null,
  isDisplayDetails: false,
};

function BranchesProvider({ children }: { children: ReactNode }) {
  const [{ branches, currentBranch, isDisplayDetails }, dispatch] = useReducer(reducer, initialState);
  const [searchParams] = useSearchParams();

  function removeDetails() {
    dispatch({ type: "branches/removeDeails" });
  }

  function displayWholeBranches() {
    dispatch({ type: "branches/all" });
  }

  useEffect(() => {
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);

      if (!isNaN(lat) && !isNaN(lng)) {
        dispatch({ type: "branch/selected", payload: { lat, lng } });
      }
    } else {
      dispatch({ type: "branches/removeDeails" });
    }
  }, [searchParams]);

  const value: BranchesContextType = {
    branches: branches,
    currentBranch: currentBranch,
    isDisplayDetails: isDisplayDetails,
    removeDetails: removeDetails,
    displayWholeBranches: displayWholeBranches,
  };

  return <BranchesContext.Provider value={value}>{children}</BranchesContext.Provider>;
}

function useBranches() {
  const context = useContext(BranchesContext);

  if (context === undefined) {
    throw new Error("use Branches must be used within a BranchesProvider");
  }
  return context;
}

export { BranchesProvider, useBranches };
