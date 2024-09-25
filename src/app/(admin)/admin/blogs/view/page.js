"use client";

import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import { toast } from "react-toastify";

export default function page() {
  const [blogData, setBlogData] = useState();

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/get-blogs`);
      if (res.data.status === 1) {
        setBlogData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (blogData) {
      new DataTable("#myTable");
    }
  }, [blogData]);


  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/blogs/delete_blog`, {
        id: id
      })
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        setBlogData(res.data.data);
      }
      console.log(blogData)
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
                View Blogs

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="">Heading</th>
                      <th className="">Blog URL</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      blogData?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.heading}
                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.blog_url}
                          </td>

                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/blogs/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</Link>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
