export function DefaultLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="mx-auto container max-w-screen-lg lg:py-10 py-5 lg:px-8 px-4">
                { children }
            </div>
        </>
    )
}