import { ReactNode } from "react";

export default function ScreenMobile({ children }: { children: ReactNode }) {
    return (
        <div className={`bg-whereWhite h-[100vh] max-w-lg mx-auto overscroll-none scrollbar-hide`}>
            {children}
        </div>
    );
}

