export default function Header() {
    return (
        <div className="flex items-center justify-center bg-cover gap-5 "
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <img src="/logo.png" alt="logo marvel" className="w-20"/>
            <h1 className="font-bold text-white text-xl">MCU Characters</h1>
        </div>
    )
}