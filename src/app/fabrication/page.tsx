import MaskGallery from './MaskGallery'

export const metadata = {
    title: 'NeoProxy Fabrication',
    description: '3D Scan Database of fabricated artifacts.',
}

export default function FabricationPage() {
    return (
        <div className="fabrication-page" data-theme="fabrication">
            <MaskGallery />
        </div>
    )
}
