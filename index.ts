interface Trip {
    start: string;
    end: string;
  }
  
  interface Shipment {
    pickups: string[];
    dropoffs: string[];
  }
  
  function isValidTrips(trips: Trip[], shipment: Shipment): boolean {
    const { pickups, dropoffs } = shipment;
  
    const tripMap = new Map<string, Set<string>>();
    trips.forEach(trip => {
      if (!tripMap.has(trip.start)) {
        tripMap.set(trip.start, new Set<string>());
      }
      tripMap.get(trip.start)!.add(trip.end);
    });
  
    const canReach = (start: string, end: string, visited = new Set<string>()): boolean => {
      if (start === end) return true;
      if (visited.has(start)) return false;
      visited.add(start);
  
      const destinations = tripMap.get(start) || new Set<string>();
      for (const destination of destinations) {
        if (canReach(destination, end, visited)) {
          return true;
        }
      }
      return false;
    };
  
    for (const pickup of pickups) {
      for (const dropoff of dropoffs) {
        if (!canReach(pickup, dropoff)) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  const trips: Trip[] = [
    { start: "A", end: "W1" },
    { start: "B", end: "W1" },
    { start: "W1", end: "C" },
    { start: "W1", end: "D" }
  ];
  
  const shipment: Shipment = {
    pickups: ["A"],
    dropoffs: ["C", "D"]
  };
  
  console.log(isValidTrips(trips, shipment)); 