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
            Abstract should be at least 300 characters long
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
            <p className="font-thin text-xs text-gray-500">Supports only PDF</p>
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
