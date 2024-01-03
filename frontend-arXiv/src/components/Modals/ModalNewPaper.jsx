import PropTypes from "prop-types";
import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Alert,
  Badge,
} from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

function ModalNewPaper({
  openModal,
  setOpenModal,
  posts,
  setPosts,
  cat,
  setCat,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("Test Title");
  const [authors, setAuthors] = useState("Test User");
  const [abscract, setAbstract] = useState("Test Abstract");
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState("");

  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Extract the file extension
      const parts = file.name.split(".");
      const extension = parts[parts.length - 1].toLowerCase();

      // Check if the file extension is allowed
      if (extension === "pdf") {
        setSelectedFile(file);
        setShowAlert(""); // Reset the alert if it was previously shown
      } else {
        // Show alert for invalid file type
        setShowAlert(
          "Wrong file type, please check if you are using pdf files"
        );
        setSelectedFile(null);
      }
    }
  };

  const handleSaveChanges = () => {
    event.preventDefault();
    // Validation checks
    if (
      !title ||
      title.length < 10 ||
      !authors ||
      !abscract ||
      abscract.length < 300 ||
      !selectedFile
    ) {
      // If any of the required fields is empty, show alert and return
      setShowAlert(
        "Please fill all the required fields, at least 10 characters for title and 300 for abstract"
      );
      return;
    }

    setShowAlert("");
    // All validations passed, proceed with saving changes
    setFile(selectedFile);
    setAuthors(authors);
    setAbstract(abscract);
    setTitle(title);

    const formData = new FormData();

    // Append data to FormData
    formData.append("action", "createPost");
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("authors", authors);
    formData.append("content", abscract);
    formData.append("abstract", abscract.slice(0, 300) + "...");
    formData.append("categories", JSON.stringify(selectedTags));

    console.log("formData", formData);

    // Make a fetch request to update user settings
    fetch(apiUrl + "/posts.php", {
      method: "POST",
      credentials: "include",
      body: formData, // Use the FormData object directly
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data

        if (data.status === 1) {
          if (data.data.Categories !== null) {
            data.data.Categories = JSON.parse(data.data.Categories);
          }
          // Create new papaer successful
          setPosts([data.data, ...posts]);
          // Close the modal
          setOpenModal(false);
        } else {
          // Failed to create paper
          setShowAlert(data.message);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    // const newPost = {
    //   title: title,
    //   authors: authors,
    //   abstract: abscract,
    //   comments: ["comment1", "comment2"],
    //   date: new Date().toDateString(),
    //   content:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!",
    //   isVerified: false,
    //   verDate: "2 minutes ago",
    //   favDate: "4 days ago",
    //   likes: "10",
    //   categories: selectedTags ? selectedTags : [{ name: "AI", color: "info" }],
    // };

    // setPosts([newPost, ...posts]);

    // console.log("New post added", newPost, selectedFile, selectedTags);

    // setOpenModal(false);
  };

  return (
    <Modal
      size={"5xl"}
      show={openModal}
      onClose={() => setOpenModal(false)}
      className="modalt"
    >
      <Modal.Header>Add a new Paper</Modal.Header>
      <Modal.Body>
        {showAlert !== "" && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {showAlert}
          </Alert>
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            shadow
            value={title}
            onChange={(event) => {
              event.preventDefault();
              setTitle(event.target.value);
            }}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="authors" value="Authors" />
          </div>
          <TextInput
            id="authors"
            type="text"
            shadow
            value={authors}
            onChange={(event) => {
              event.preventDefault();
              setAuthors(event.target.value);
            }}
            required
          />
        </div>

        <div className="py-2 px-4 mb-4 mt-4 bg-gray rounded-lg rounded-t-lg border border-gray-300 ">
          <p className="font-thin text-xs text-gray-500">
            Abstract should be at least 200 characters long
          </p>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            value={abscract}
            onChange={(e) => setAbstract(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload file" />
            <p className="font-thin text-xs text-gray-500">
              Supports PDF and EPUB files, epubs are generly advised for better
              security and user experience
            </p>
          </div>
          <FileInput
            id="file-upload"
            onChange={handleFileChange}
            accept=".epub, .pdf"
            required
          />
        </div>
        <div className="">
          <div className="mb-2 mt-2 block">
            <Label htmlFor="tags" value="Tags" />
            <p className="font-thin text-xs text-gray-500">
              For better coverage, please select at least one tag
            </p>
          </div>
          <div className="flex flex-col flex-wrap h-[130px]">
            {cat.map((c) => (
              <div
                key={c.CategoryName}
                className="flex items-center flex-wrap mb-2"
              >
                <input
                  type="checkbox"
                  id={c.CategoryName}
                  checked={selectedTags.some(
                    (t) => t.CategoryName === c.CategoryName
                  )}
                  onChange={() => {
                    const updatedTags = selectedTags.some(
                      (t) => t.CategoryName === c.CategoryName
                    )
                      ? selectedTags.filter(
                          (t) => t.CategoryName !== c.CategoryName
                        )
                      : [
                          ...selectedTags,
                          {
                            CategoryID: c.CategoryID,
                            CategoryName: c.CategoryName,
                            CategoryColor: c.CategoryColor,
                          },
                        ];
                    setSelectedTags(updatedTags);
                  }}
                />
                <Badge
                  htmlFor={c.CategoryName}
                  value={c.CategoryName}
                  color={c.CategoryColor}
                  className="ml-2"
                >
                  {c.CategoryName}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          outline
          pill
          gradientDuoTone="purpleToBlue"
          type="submit"
          onClick={handleSaveChanges}
        >
          Add Paper
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalNewPaper.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  openModalNewPaper: PropTypes.bool,
  setOpenModalNewPaper: PropTypes.func,
  cat: PropTypes.array,
  setCat: PropTypes.func,
};

export default ModalNewPaper;
