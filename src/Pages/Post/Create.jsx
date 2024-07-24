// import { useState } from "react";

// export default function Create() {
//   const [formData, setFormData] = useState({
//     title: "",
//     body: "",
//   });

//   async function handleCreate(e) {
//     e.preventDefault();

//     console.log(formData);
//   }
//   return (
//     <>
//       <h1 className="title">Create a new post</h1>

//       <form className="w-1/2 mx-auto space-y-6" onSubmit={handleCreate}>
//         <div>
//           <input
//             type="text"
//             placeholder="Post Title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <textarea
//             rows={6}
//             placeholder="Post Content"
//             value={formData.body}
//             onChange={(e) => setFormData({ ...formData, body: e.target.value })}
//           ></textarea>
//         </div>

//         <button className="primary-btn">Create</button>
//       </form>
//     </>
//   );
// }
