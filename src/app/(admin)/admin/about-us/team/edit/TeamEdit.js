
"use client"
import { useState, useRef, useEffect } from "react";
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function page() {
  const [inputData, setInputData] = useState({});
  const [imageData, setImageData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
    const id = searchParams.get("id");

  useEffect(() => {
    getTeamData();
  }, [])

  const getTeamData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/about/get_team_member_by_id`, { id: id })
      if (res.data.status == 1) {
        setInputData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  const handleImageData = (e) => {
    setImageData(e.target.files[0]);
  }




  const handleUpdateTeamMember = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", inputData.name);
      formdata.append("designation", inputData.designation);
      formdata.append("id", id);
      formdata.append("image", imageData);

      const res = await axios.post(`${BASE_URL}/about/update_team_member`, formdata)
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        router.push("/admin/about-us/team/view")
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="app-main__inner">
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                Add team member
              </div>

              <div className="card-body">
                <form >
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Name
                        </label>
                        <input
                          onChange={handleInputData}
                          name="name"
                          placeholder="Enter the heading"
                          type="text"
                          className="form-control"
                          value={inputData.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Designation
                        </label>
                        <input
                          onChange={handleInputData}
                          name="designation"
                          type="text"
                          placeholder="Enter the title"
                          className="form-control"
                          value={inputData.designation}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="position-relative form-group">
                        <label>
                          Image
                        </label>
                        <input
                          onChange={handleImageData}
                          name="image"
                          placeholder="Enter the short description"
                          type="file"
                          accept="image/*"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <img src={imageData ? URL.createObjectURL(imageData) : inputData.image} alt="" width="100px" />
                    </div>
                  </div>
                  <button className="mt-2 px-3 btn btn-primary" onClick={handleUpdateTeamMember}>update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
