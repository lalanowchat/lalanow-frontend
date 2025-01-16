
export default function Header({ title }) {
  
    return (
      <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
        <nav className="flex h-16 items-center justify-between px-4">
            <div className="page-title">
                {title}
            </div>
        </nav>
      </div>
    );
  }
  