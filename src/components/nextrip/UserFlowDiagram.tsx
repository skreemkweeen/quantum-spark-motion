const Node = ({ children }: { children: string }) => (
  <div
    className="rounded-md border border-white/[0.07] px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-white/65 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white/90"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 12px -6px rgba(0,0,0,0.6)",
    }}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">{children}</div>
);

const Arrow = () => <span className="text-white/15 text-[10px]">→</span>;

export const UserFlowDiagram = () => (
  <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 py-8">
    <div
      className="grid h-12 w-12 place-items-center rounded-md border border-white/10 text-xs text-white/85"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 20px -8px rgba(0,0,0,0.7)",
      }}
    >
      N
    </div>
    <Node>Login</Node>
    <Row>
      <Node>Business</Node>
      <Node>App Type</Node>
      <Node>Traveler</Node>
    </Row>
    <Row>
      <Node>Exit</Node>
      <Node>Menu</Node>
      <Node>Search</Node>
      <Arrow />
      <Node>Home</Node>
    </Row>
    <Row>
      <Node>Book Flight</Node>
      <Node>Flight Type</Node>
      <Node>Explore</Node>
      <Node>Offers</Node>
    </Row>
    <Row>
      <Node>One Way</Node>
      <Node>Flights List</Node>
      <Node>My Trips</Node>
      <Node>Destinations</Node>
      <Node>Featured</Node>
      <Node>Personalized</Node>
    </Row>
    <Row>
      <Node>Support</Node>
      <Node>Upcoming</Node>
      <Node>Date</Node>
      <Node>Search</Node>
      <Node>Save</Node>
      <Node>Trip</Node>
      <Node>Manage</Node>
    </Row>
    <Row>
      <Node>Notifications</Node>
      <Node>Passengers</Node>
      <Node>Filters</Node>
      <Node>Sort</Node>
    </Row>
    <Row>
      <Node>Payments</Node>
      <Node>Cabin Class</Node>
      <Node>Best Match</Node>
      <Node>Passengers</Node>
    </Row>
    <Row>
      <Node>Premium</Node>
      <Node>Traveler</Node>
      <Node>Results</Node>
      <Node>Details</Node>
      <Node>Amenities</Node>
    </Row>
    <Row>
      <Node>Settings</Node>
      <Node>Seat Map</Node>
      <Node>Trip Summary</Node>
      <Node>Add-ons</Node>
    </Row>
    <Row>
      <Node>Payment</Node>
      <Node>Confirmation</Node>
    </Row>
  </div>
);