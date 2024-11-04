import { ReactNode } from "react";

export default function ScreenMobile({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-gray-100 h-[100vh] max-w-lg mx-auto overscroll-none scrollbar-hide border`}>
            {children}
        </div>
    );
}

