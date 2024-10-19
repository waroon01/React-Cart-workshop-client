import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { removeFiles, uploadFiles } from "../../api/Product";
import useEcomStore from "../../Store/ecom-store";

const UploadFile = ({ form, setForm }) => {
  //รับ props จาก FormProduct component
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    const files = e.target.files;
    // console.log(files)
    if (files) {
      setIsLoading(true);
      // eslint-disable-next-line react/prop-types
      let allFiles = form.images; //[] empty array
      // console.log(allFiles)

      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])

        // validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} ไม่ใช่รูปภาพ`);
          continue; //ถ้าไม่ใช่ภาพให้ข้ามขั้นตอน
        }
        // image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // console.log('data', data)
            // Endpoint BackEnd
            uploadFiles(token, data)
              .then((res) => {
                // console.log(res);
                // eslint-disable-next-line react/prop-types
                allFiles.push(res.data);
                // console.log("allFiles", allFiles)
                setForm({
                  ...form,
                });
                toast.success("Upload image Success!!!");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  console.log(form)

  const handleDelete = (public_id)=>{
    const images = form.images

    removeFiles(token, public_id)
    .then((res)=>{
        const filterImages = images.filter((item)=>{
            return item.public_id !== public_id
        })
        console.log(filterImages)
        setForm({
            ...form,
            images: filterImages
        })
        toast.success(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })

  }

  return (
    <div className="my-4">

      <div className="flex mx-4 gap-4 my-4">
        {/* image */}
        {
            form.images.map((item, index)=>
                <div key={index} className="relative">
                    <img                         
                        className="w-24 h24 hover:scale-105" 
                        src={item.url}  
                    />
                    <span 
                        onClick={()=>handleDelete(item.public_id)}
                        className="absolute top-0 right-0 bg-slate-400 px-1 text-red-500 rounded-md"
                    >x</span>
                </div>

            )
        }
      </div>

      <div>
        <input 
            onChange={handleOnChange} 
            type="file" 
            name="images"
            multiple 
        />
      </div>

    </div>
  );
};



export default UploadFile;
