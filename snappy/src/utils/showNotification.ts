import { toast } from "react-toastify";

export function showErrorNotify(error: string) {
	toast.error(error, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnFocusLoss: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
}

export function showSuccessNotify(message: string) {
	toast.success(message, {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnFocusLoss: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
}
