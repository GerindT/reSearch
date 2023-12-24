import PropTypes from "prop-types";
import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Alert,
} from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

function ModalNewPaper({ openModal, setOpenModal, posts, setPosts }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("Test Title");
  const [authors, setAuthors] = useState("Test User");
  const [abscract, setAbstract] = useState("Test Abstract");

  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
  };

  const handleSaveChanges = () => {
    // All validations passed, proceed with saving changes
    setFile(selectedFile);
    setAuthors(authors);
    setAbstract(abscract);
    const newPost = {
      title: title,
      authors: authors,
      abstract: abscract,
      comments: ["comment1", "comment2"],
      date: Date.now(),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!",
      isVerified: false,
      verDate: "2 minutes ago",
      favDate: "4 days ago",
      likes: "10",
      categories: [
        { name: "CNN", color: "indigo" },
        { name: "Robotics", color: "warning" },
        { name: "IOT", color: "pink" },
        { name: "BIG DATA", color: "purple" },
      ],
    };

    setPosts([newPost, ...posts]);

    setOpenModal(false);
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <form>
        <Modal.Header>Add a new Paper</Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> Change a few
              things up and try submitting again.
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
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
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
            </div>
            <FileInput
              id="file-upload"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
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
      </form>
    </Modal>
  );
}

ModalNewPaper.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  openModalNewPaper: PropTypes.bool,
  setOpenModalNewPaper: PropTypes.func,
};

export default ModalNewPaper;
