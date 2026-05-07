import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// PAGE SKELETON
export const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-100 p-6">
    <Skeleton height={40} width={300} className="mb-6" />
    <Skeleton height={400} count={3} />
  </div>
);

// NAVBAR SKELETON
export const NavbarSkeleton = () => (
  <nav className="max-w-7xl w-full mx-auto px-4 py-3 border-b border-gray-300">
    <div className="flex items-center justify-between">
      <Skeleton width={140} height={24} />
      <div className="hidden md:flex items-center gap-6 w-full ml-6">
        <Skeleton width={70} height={35} />
        <Skeleton width={120} height={35} />
        <Skeleton width={100} height={35} />
        <div className="flex-1"></div>
        <Skeleton width={200} height={35} />
        <Skeleton width={80} height={35} />
        <Skeleton width={80} height={35} />
      </div>
    </div>
  </nav>
);

// CAROUSEL SKELETON
export const CarouselSkeleton = () => (
  <div className="flex justify-center mt-5">
    <Skeleton height={250} width="100%" className="max-w-3xl rounded-lg" />
  </div>
);

// PRODUCT CARD SKELETON
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <Skeleton height={160} />
    <div className="p-3">
      <Skeleton height={16} width="60%" className="mb-2" />
      <Skeleton height={16} className="mb-2" />
      <Skeleton height={16} width="40%" className="mb-2" />
      <Skeleton height={20} />
    </div>
  </div>
);


export const ProductGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
  </div>
);

// CART ITEM SKELETON
export const CartItemSkeleton = ({ count = 4 }) => (
  <div className="space-y-4">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="flex gap-4 border-b pb-4">
          <Skeleton height={100} width={100} />
          <div className="flex-1">
            <Skeleton height={16} width="60%" className="mb-2" />
            <Skeleton height={14} width="40%" className="mb-2" />
            <Skeleton height={14} width="30%" />
          </div>
          <Skeleton height={30} width={60} />
        </div>
      ))}
  </div>
);

// TABLE SKELETON
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    {/* Header */}
    <div
      className="bg-gray-100 border-b border-gray-200 p-4 grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array(columns)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} height={16} width="80%" />
        ))}
    </div>
    {/* Rows */}
    {Array(rows)
      .fill(0)
      .map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="border-b border-gray-200 p-4 grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array(columns)
            .fill(0)
            .map((_, colIdx) => (
              <Skeleton
                key={colIdx}
                height={16}
                width={colIdx === 0 ? "100%" : "80%"}
              />
            ))}
        </div>
      ))}
  </div>
);

// USER LIST SKELETON
export const UserListSkeleton = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
        >
          <Skeleton circle width={40} height={40} />
          <div className="flex-1">
            <Skeleton height={16} width="30%" className="mb-2" />
            <Skeleton height={14} width="40%" />
          </div>
          <Skeleton width={80} height={28} />
        </div>
      ))}
  </div>
);

// FORM SKELETON
export const FormSkeleton = () => (
  <div className="w-full max-w-md space-y-4 p-8 border border-gray-200 rounded-lg bg-white">
    <Skeleton height={32} width="80%" />
    <Skeleton height={44} width="100%" />
    <Skeleton height={44} width="100%" />
    <Skeleton height={20} width="60%" />
    <Skeleton height={40} width="100%" />
    <Skeleton height={16} width="50%" />
  </div>
);

// SIDEBAR SKELETON
export const SidebarSkeleton = () => (
  <aside className="w-60 bg-white shadow-lg p-4">
    <div className="flex items-center gap-3 mb-8">
      <Skeleton circle width={40} height={40} />
      <div className="flex-1">
        <Skeleton height={16} width="70%" className="mb-2" />
        <Skeleton height={12} width="50%" />
      </div>
    </div>
    <div className="space-y-3">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} height={36} width="100%" />
        ))}
    </div>
  </aside>
);

// FOOTER SKELETON
export const FooterSkeleton = () => (
  <footer className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
    <div className="flex flex-wrap justify-between gap-12 md:gap-6">
      <div className="max-w-80">
        <Skeleton height={30} width={120} className="mb-4" />
        <Skeleton count={3} />
      </div>
      <div>
        <Skeleton height={20} width={100} className="mb-3" />
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={16} width={80} />
            ))}
        </div>
      </div>
      <div>
        <Skeleton height={20} width={100} className="mb-3" />
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={16} width={100} />
            ))}
        </div>
      </div>
    </div>
  </footer>
);

// HERO SECTION SKELETON
export const HeroSectionSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 mt-6">
    {Array(4)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="mb-10">
          <Skeleton height={28} width={200} className="mb-4" />
          <ProductGridSkeleton count={5} />
        </div>
      ))}
  </div>
);

// PROFILE SKELETON
export const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-2xl mx-auto">
      <Skeleton height={40} width={200} className="mb-6" />
      <div className="bg-white p-8 rounded-lg space-y-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton height={14} width={100} className="mb-2" />
              <Skeleton height={40} />
            </div>
          ))}
        <Skeleton height={44} width={200} />
      </div>
    </div>
  </div>
);

// DASHBOARD SKELETON
export const DashboardSkeleton = () => (
  <div className="flex h-screen bg-gray-100">
    <SidebarSkeleton />
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Skeleton height={32} width={300} className="mb-6" />
        <TableSkeleton rows={5} columns={4} />
      </div>
    </div>
  </div>
);

// MODAL SKELETON
export const ModalSkeleton = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full space-y-4">
      <Skeleton height={24} width="60%" />
      <Skeleton count={3} />
      <div className="flex gap-4">
        <Skeleton height={40} width="50%" />
        <Skeleton height={40} width="50%" />
      </div>
    </div>
  </div>
);
