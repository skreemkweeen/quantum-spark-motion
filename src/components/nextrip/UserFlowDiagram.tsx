const Node = ({ children }: { children: string }) => (
  <div className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
    {children}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">{children}</div>
);

const Arrow = () => <span className="text-white/20">→</span>;

export const UserFlowDiagram = () => (
  <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 py-8">
    <div className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-xs text-white/80">
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