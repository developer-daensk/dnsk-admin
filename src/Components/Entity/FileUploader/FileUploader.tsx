import { iLocale } from "../Locale/types";
import { Button } from "../../Shadcn/button";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ImageCropper from "../ImageCropper/ImageCropper";
import { uploadImage } from "./api";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";
import { getDictionary } from "./i18n";
import { iMedia } from "./types";

interface iProps {
  image?: string;
  defaultImage?: string;
  onRemove: () => Promise<boolean>;
  onChange: (image_data: iMedia) => Promise<boolean>;
  onClose?: () => void;
}

export default function FileUploader(props: iProps) {
  const { image, defaultImage = "", onClose, onChange, onRemove } = props;
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);
  const [openCropModal, setOpenCropModal] = useState<boolean>(false);
  const imageFileInput = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(image || defaultImage || "");
  const [selectedImage, setSelectedImage] = useState({
    blobImage: "",
    fileName: "",
    type: "",
  });

  useEffect(() => {
    return () => {
      if (selectedImage.blobImage) URL.revokeObjectURL(selectedImage.blobImage);
    };
  }, [selectedImage.blobImage]);

  useEffect(() => {
    setCurrentImage(image || defaultImage || "");
  }, [image, defaultImage]);

  const removeHandler = async () => {
    setIsLoading(true);
    const readyToReset = await onRemove();
    setIsLoading(false);
    if (readyToReset) setCurrentImage(defaultImage || "");
  };

  const selectFileWindowHandler = () => {
    imageFileInput?.current?.click();
  };

  const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files[0]) return;
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) {
      e.target.value = "";
      return;
    }
    const fileName = file.name ?? "";
    const type = file.type ?? "";
    const blob = URL.createObjectURL(files[0]);
    setSelectedImage({ type, fileName, blobImage: blob });
    setOpenCropModal(true);
    e.target.value = "";
  };

  const closeCropModalHandler = async () => {
    setOpenCropModal(false);
    if (onClose) onClose();
  };

  const onSubmitHandler = async (imageBlob: Blob) => {
    if (!imageBlob) return;
    setIsLoading(true);
    const res = await uploadImage(imageBlob, selectedImage.fileName);
    setIsLoading(false);
    if (!res) return;
    const readyToClose = await onChange(res);
    if (readyToClose) closeCropModalHandler();
  };

  return (
    <>
      <input
        ref={imageFileInput}
        type="file"
        accept={ALLOWED_FILE_TYPES.join(", ")}
        className="hidden"
        onChange={(val) => selectFileHandler(val)}
      />
      <div className="flex w-full flex-col items-center gap-4">
        <div className="bg-muted relative w-full max-w-sm overflow-hidden rounded-lg">
          {currentImage ? (
            <Image
              src={currentImage}
              className="h-auto w-full object-cover"
              alt="selected image"
              width={400}
              height={400}
              priority
            />
          ) : (
            <div className="flex aspect-square h-full w-full flex-col items-center justify-center">
              <ImageIcon size="190" className="text-background" />
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex w-full items-center justify-center bg-black/50">
              <div className="text-white">Loading...</div>
            </div>
          )}
        </div>
        <div className="flex w-full max-w-sm flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={selectFileWindowHandler}
            className="grow-1"
          >
            <Upload size={16} />
            <span>{dictionary.uploadNewPhoto}</span>
          </Button>
          {currentImage && (
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={removeHandler}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
      {openCropModal && (
        <ImageCropper
          isOpen={true}
          image={selectedImage.blobImage}
          type={selectedImage.type ?? selectedImage.fileName.split(".").pop()}
          onClose={closeCropModalHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </>
  );
}
