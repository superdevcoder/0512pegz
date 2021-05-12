declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": any;
        }
    }
}
const ModelViewer: React.FC<{
    src: string;
}> = ({ src }) => (
    <model-viewer
        src={src}
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
    />
);

export default ModelViewer;
