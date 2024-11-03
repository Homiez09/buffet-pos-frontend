'use client';

import { useRouter } from "next/navigation";

export default function HistoryPage() {

    const router = useRouter();

    const TableCard = ({ tableID }: { tableID: string }) => {
        return (
          <div className="flex flex-row justify-between shadow-md p-5 rounded-lg">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="font-bold text-xl">Table NO: 21</div>
                <div className="text-grey">
                  <p>27 ก.ย. 2024 21.00 น.</p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div
                  className="btn btn-info text-whereWhite"
                  onClick={() => router.push(`/manager/history/${tableID}`)}
                >
                  view order
                </div>
              </div>
            </div>
          </div>
        );
      };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <label className="input input-bordered flex items-center gap-2 rounded-xl">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

      </div>
      <div className="gap-5 flex flex-col">
        {Array(10)
          .fill(0)
          .map((_, i) => {
            return <TableCard key={i} tableID={`${i}`} />;
          })}
      </div>
    </div>
  );
}
