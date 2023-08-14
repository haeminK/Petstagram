import React from 'react'
import Dropzone from 'react-dropzone'

//Components containg image upload zone and preview images
const ImageUpload = ({ onImageChange, images, onDeleteOriginalImgs = null }) => {

    const handleDrop = files => {
        let imageArray = [];

        //make temporary preview url of images
        files.forEach(file => {
            const newImage = {
                url: URL.createObjectURL(file),
                file
            };
            imageArray.push(newImage);
        });
        //update images state
        onImageChange(imageArray, true);
    };

    //delete an image on an image click
    const handleDelete = event => {
        const newImages = [];
        const deletedImages = [];


        for (let image of images) {

            if (image.url !== event.target.src) {
                newImages.push(image)
            }
            else if (image.file === null) {
                deletedImages.push(image.filename)
            }
        }

        //overwrites images state with newImages. false means no add (overwrite)
        onImageChange(newImages, false);

        //if it's editing mode, then update deletedImages state (onDeleteOriginalImgs are given when it's editing mode)
        onDeleteOriginalImgs && onDeleteOriginalImgs(deletedImages);
    };

    const imagePreview = images.map((image, index) => {
        return <div className='inline-block' onClick={handleDelete} key={index}>
            <img className='min-w-[300px] h-[300px]' src={image.url} alt="thumbnail" />
        </div>
    });

    return (
        <div className='flex gap-4'>

            <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section className='min-w-[300px] h-[300px] flex justify-center items-center border'>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className='text-center text-2xl'>Drop pictures</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div
                className={`h-[300px] ${images.length > 0 && 'border'} overflow-x-scroll overflow-y-hidden whitespace-nowrap`}>
                {imagePreview}
            </div>

        </div>
    )
}

//prevent rerendering
export default React.memo(ImageUpload);