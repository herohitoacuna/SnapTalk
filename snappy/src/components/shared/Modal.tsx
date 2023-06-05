import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
	const modalRoot = document.getElementById("modal-root") as Element | null;
	if (!modalRoot) return null;

	return createPortal(
		<div className="w-screen h-screen bg-black/50 z-30 fixed top-0 left-0 flex items-center justify-center">
			{children}
		</div>,
		modalRoot,
	);
}
