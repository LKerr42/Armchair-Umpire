type SidebarProps = {
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({
    open,
    onClose,
}: SidebarProps) {
    if (!open) return null;

    return (
        <div className="fixed top-0 left-0 h-screen w-80 bg-slate-800 text-white">
            <button
                onClick={onClose}
                className="p-4 hover:text-sky-400 cursor-pointer transition-colors"
            >
                Close
            </button>

            <div className="p-4">
                Sidebar content
            </div>
        </div>
    );
}