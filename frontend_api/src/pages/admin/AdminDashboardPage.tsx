import { useState } from "react";
import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import {
  kpiCards,
  lowStockItems,
  peakHourHeights,
  recentOrders,
  topProducts,
} from "./AdminDashboardData";

function orderStatusClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-success-100 text-success-700 ring-1 ring-success-300";
    case "Processing":
      return "bg-info-100 text-info-700 ring-1 ring-info-300";
    case "Shipped":
      return "bg-accent-100 text-accent-700 ring-1 ring-accent-300";
    case "Refunded":
      return "bg-error-100 text-error-700 ring-1 ring-error-300";
    default:
      return "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-300";
  }
}

const ORDERS_PER_PAGE = 5;

export default function AdminDashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(recentOrders.length / ORDERS_PER_PAGE));
  const paginatedOrders = recentOrders.slice((currentPage - 1) * ORDERS_PER_PAGE,currentPage * ORDERS_PER_PAGE);

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 bg-bg-secondary">
      {/* Page header */}
      <header>
        <h2 className="text-lg font-bold sm:text-xl md:text-2xl bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
          POS &amp; ecommerce overview
        </h2>
        <p className="mt-1 text-xs text-text-tertiary sm:text-sm font-medium">
          Real-time dashboard analytics and insights
        </p>
      </header>

      {/* KPI cards — 1 col → 2 col → 4 col */}
      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {kpiCards.map(({ label, value, sub, change, icon: Icon, accent }) => (
            <article
              key={label}
              className="relative overflow-hidden rounded-xl border border-border-light bg-bg-primary p-4 text-text-primary shadow-sm sm:p-5 hover:shadow-lg transition-shadow"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent} opacity-5`}
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-tertiary sm:text-sm truncate">
                    {label}
                  </p>
                  <p className="mt-1.5 text-xl font-bold tracking-tight tabular-nums text-text-primary sm:text-2xl md:text-3xl">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary truncate">
                    {sub}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-success-600">
                    <ArrowTrendingUpIcon
                      className="size-3.5 shrink-0"
                      aria-hidden
                    />
                    <span className="truncate">{change} vs yesterday</span>
                  </p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-primary-600 text-bg-primary shadow-md sm:size-12">
                  <Icon className="size-5 sm:size-6" aria-hidden />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Main content grid — stacks on mobile, 3-col on xl */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 xl:grid-cols-3">
        {/* Orders table — full width until xl */}
        <section
          className="min-w-0 overflow-hidden rounded-xl border border-border-light bg-bg-primary shadow-md xl:col-span-2 hover:shadow-lg transition-shadow"
          aria-labelledby="orders-heading"
        >
          <div className="flex flex-col gap-3 border-b border-border-light bg-bg-secondary px-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-4 sm:py-4 md:px-5">
            <div className="min-w-0">
              <h3
                id="orders-heading"
                className="text-sm font-bold text-text-primary sm:text-base"
              >
                Latest orders
              </h3>
              <p className="text-xs text-text-tertiary sm:text-sm">
                Recent POS and web checkouts
              </p>
            </div>
            <button
              type="button"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-primary-300 bg-primary-50 cursor-pointer px-3 py-2 text-xs font-semibold text-primary-700 shadow-sm transition hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:w-auto sm:text-sm"
            >
              <ArrowPathIcon className="size-4" aria-hidden />
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-160 text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border-light bg-bg-secondary text-text-secondary">
                  <th className="px-3 py-3 font-semibold md:px-5">Order</th>
                  <th className="px-3 py-3 font-semibold md:px-5">Customer</th>
                  <th className="px-3 py-3 font-semibold md:px-5">Amount</th>
                  <th className="px-3 py-3 font-semibold md:px-5">Channel</th>
                  <th className="px-3 py-3 font-semibold md:px-5">Status</th>
                  <th className="px-3 py-3 font-semibold md:px-5">When</th>
                  <th className="px-3 py-3 font-semibold md:px-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {paginatedOrders.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-bg-primary text-text-primary transition hover:bg-bg-tertiary"
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold md:px-5 text-primary-600">
                      {row.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-5 font-medium">
                      {row.customer}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 tabular-nums md:px-5 font-semibold text-success-600">
                      {row.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-5">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                        {row.channel}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 md:px-5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${orderStatusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-text-tertiary md:px-5 text-xs">
                      {row.time}
                    </td>
                    <td className="px-3 py-3 md:px-5">
                      {/* Stack buttons on xs, row on sm+ */}
                      <div className="flex flex-col gap-1.5 xs:flex-row xs:flex-wrap min-w-[100px]">
                        <button
                          type="button"
                          className="rounded-md bg-primary-600 px-2.5 py-1 text-xs font-semibold text-bg-primary shadow-sm transition cursor-pointer hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1 rounded-md border border-neutral-300 bg-bg-secondary px-2.5 py-1 text-xs font-medium text-text-primary transition cursor-pointer hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                        >
                          <PrinterIcon className="size-3.5" aria-hidden />
                          Print
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-error-300 px-2.5 py-1 text-xs font-medium text-error-700 transition cursor-pointer hover:bg-error-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-error-400"
                        >
                          Refund
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          <div className="flex items-center justify-between border-t border-border-light bg-bg-primary px-3 py-3 sm:px-5 sm:py-4">
            {/* Left: Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-bg-primary px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm transition hover:bg-bg-tertiary disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:px-4 sm:py-2 sm:text-sm"
            >
              <ChevronLeftIcon className="size-4" aria-hidden />
              Previous
            </button>

            {/* Centre: page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`
                    inline-flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400
                    ${
                      page === currentPage
                        ? "bg-primary-600 text-white shadow-sm"
                        : "border border-border-default bg-bg-primary text-text-secondary hover:bg-bg-tertiary"
                    }
                  `}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            {/* Right: Next */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-bg-primary px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm transition hover:bg-bg-tertiary disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:px-4 sm:py-2 sm:text-sm"
            >
              Next
              <ChevronRightIcon className="size-4" aria-hidden />
            </button>
          </div>
        </section>

        {/* Sidebar widgets — stack vertically, side-by-side on md, column again on xl */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-1">
          {/* Settlement snapshot */}
          <section
            className="rounded-xl border border-border-light bg-bg-primary p-4 shadow-md sm:p-5 hover:shadow-lg transition-shadow"
            aria-labelledby="cashflow-heading"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  id="cashflow-heading"
                  className="text-sm font-bold text-text-primary sm:text-base"
                >
                  Settlement snapshot
                </h3>
                <p className="mt-1 text-xs text-text-tertiary font-medium sm:text-sm">
                  Card batches vs cash drawer
                </p>
              </div>
              <BanknotesIcon
                className="size-7 sm:size-8 shrink-0 text-primary-600"
                aria-hidden
              />
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4 pb-2">
                <dt className="text-text-secondary font-medium">
                  Card (settled)
                </dt>
                <dd className="font-bold tabular-nums text-text-primary">
                  $3,120.00
                </dd>
              </div>
              <div className="flex justify-between gap-4 pb-2">
                <dt className="text-text-secondary font-medium">Cash drawer</dt>
                <dd className="font-bold tabular-nums text-text-primary">
                  $1,166.40
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border-light pt-2">
                <dt className="font-semibold text-text-primary">
                  Pending capture
                </dt>
                <dd className="font-bold tabular-nums text-success-600">
                  $412.80
                </dd>
              </div>
            </dl>
          </section>

          {/* Low stock */}
          <section
            className="rounded-xl border border-warning-300 bg-warning-50 p-4 shadow-md sm:p-5 hover:shadow-lg transition-shadow"
            aria-labelledby="stock-heading"
          >
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon
                className="size-5 sm:size-6 shrink-0 text-warning-700 mt-0.5"
                aria-hidden
              />
              <div>
                <h3
                  id="stock-heading"
                  className="text-sm font-bold text-warning-900 sm:text-base"
                >
                  Low stock
                </h3>
                <p className="mt-1 text-xs text-warning-700 font-medium sm:text-sm">
                  Reorder before shelves run dry
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {lowStockItems.map((item) => (
                <li
                  key={item.sku}
                  className="flex items-center justify-between gap-2 rounded-lg border border-warning-200 bg-bg-primary px-3 py-2 hover:bg-bg-secondary transition"
                >
                  <span className="min-w-0 truncate font-medium text-text-primary text-xs sm:text-sm">
                    {item.name}
                  </span>
                  <span className="shrink-0 tabular-nums text-warning-700 font-semibold text-xs sm:text-sm">
                    {item.qty} left
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Top movers */}
          <section
            className="rounded-xl border border-border-light bg-bg-primary p-4 shadow-md sm:p-5 hover:shadow-lg transition-shadow"
            aria-labelledby="top-products-heading"
          >
            <h3
              id="top-products-heading"
              className="text-sm font-bold text-text-primary sm:text-base"
            >
              Top movers (7d)
            </h3>
            <ul className="mt-4 space-y-2.5">
              {topProducts.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between gap-3 text-sm border-b border-border-light pb-2 last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-primary-600 text-xs font-bold text-bg-primary">
                      {i + 1}
                    </span>
                    <span className="truncate font-medium text-text-primary text-xs sm:text-sm">
                      {p.name}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums font-semibold text-success-600 text-xs sm:text-sm">
                    {p.units} · {p.rev}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Peak hours bar chart */}
          <section
            className="rounded-xl border border-accent-300 bg-accent-50 p-4 sm:p-5 hover:shadow-lg transition-shadow"
            aria-labelledby="hours-heading"
          >
            <div className="flex items-center gap-2">
              <ClockIcon
                className="size-4 sm:size-5 text-accent-700"
                aria-hidden
              />
              <h3
                id="hours-heading"
                className="text-xs font-bold text-accent-900 sm:text-sm"
              >
                Peak hours (today)
              </h3>
            </div>
            <div className="mt-4 flex h-20 sm:h-24 items-end gap-1 sm:gap-1.5">
              {peakHourHeights.map((heightPercent, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-linear-to-t from-accent-600 to-accent-400 min-w-0"
                  style={{ height: `${heightPercent}%` }}
                  title={`Slot ${i + 1}`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-accent-700 font-medium">
              Placeholder bars — replace with a chart when you add analytics.
            </p>
          </section>

          {/* Quick actions */}
          <section
            className="rounded-xl border border-primary-300 bg-linear-to-br from-primary-50 to-bg-primary p-4 text-text-primary shadow-md sm:p-5 hover:shadow-lg transition-shadow md:col-span-2 xl:col-span-1"
            aria-labelledby="quick-heading"
          >
            <div className="flex items-center gap-2">
              <CubeIcon
                className="size-4 sm:size-5 text-primary-600"
                aria-hidden
              />
              <h3
                id="quick-heading"
                className="text-sm font-bold text-primary-900 sm:text-base"
              >
                Quick actions
              </h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="flex-1 sm:flex-none rounded-lg bg-linear-to-r from-primary-600 to-primary-500 px-3 py-2 text-xs sm:text-sm font-semibold text-bg-primary shadow-sm ring-1 ring-primary-400 transition hover:from-primary-700 hover:to-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 text-center"
              >
                New POS sale
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none rounded-lg bg-bg-secondary px-3 py-2 text-xs sm:text-sm font-semibold text-text-primary shadow-sm ring-1 ring-border-default transition hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 text-center"
              >
                Register payout
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none rounded-lg bg-bg-secondary px-3 py-2 text-xs sm:text-sm font-semibold text-text-primary shadow-sm ring-1 ring-border-default transition hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 text-center"
              >
                End of day
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
