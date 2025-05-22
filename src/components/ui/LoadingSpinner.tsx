import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'

export function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm z-50">
            <Helix
                size="45"
                speed="2.5" 
                color="white"
            />
        </div>
    );
}