const PhotoPreview = ({ previewPhoto, onRemove }) => {
    if (!previewPhoto) return null;

    return (
        <div className="mb-2 relative w-fit">
            <img
                src={previewPhoto}
                onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                }}
                alt="Foto profil"
                className="w-24 h-24 object-cover rounded border"
            />
            <button
                type="button"
                onClick={onRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                title="Hapus Foto"
            >
                ×
            </button>
        </div>
    );
};

export default PhotoPreview;
