import { useState } from "react"
import Resizer from "react-image-file-resizer"
import { toast } from "react-toastify"
import { uploadFiles } from "../../api/Product"
import useEcomStore from "../../Store/ecom-store"



const UploadFile = ({ form, setForm }) => { //รับ props จาก FormProduct component
    const token = useEcomStore((state)=>state.token)
    const [ isLoading, setIsLoading ] = useState(false)
    const handleOnChange = (e)=>{

    const files = e.target.files
    // console.log(files)
    if(files){
        setIsLoading(true)
        let allFiles = form.images //[] empty array
        console.log(allFiles)

        for( let i=0; i < files.length; i++ ){
            // console.log(files[i])
            
            // validate
            const file = files[i]
            if(!file.type.startsWith('image/')){
                toast.error(`File ${file.name} ไม่ใช่รูปภาพ`)
                continue //ถ้าไม่ใช่ภาพให้ข้ามขั้นตอน
            }   
            // image Resize 
            Resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (data)=>{
                    // console.log('data', data)
                    // Endpoint BackEnd
                    uploadFiles(token, data)
                    .then((res)=>{
                        console.log(res)
                        allFiles.push(res.data)
                        console.log("allFiles", allFiles)
                        setForm({
                            ...form,
                        })
                        toast.success('Upload image Success!!!')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

                },
                "base64"
            )


        }
        
    }
  }

  return (
    <div>
        <input 
            onChange={handleOnChange}
            type="file" 
            name="images"
            multiple
        />
    </div>
  )
}

export default UploadFile