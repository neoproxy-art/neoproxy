import MaskGallery from './MaskGallery'

export const metadata = {
    title: 'NeoProxy Fabrication',
    description: '3D Scan Database of fabricated artifacts.',
}

export default function FabricationPage() {
    return (
        <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black', margin: 0 }}>
            <MaskGallery />
        </main>
    )
}
