import { Button, Modal, Checkbox, Table, Alert, Badge } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

import { HiInformationCircle } from "react-icons/hi";

function ModalDashboard({ openModal, setOpenModal }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState(false);

  const handleCheckboxChange = (username) => {
    if (selectedUsers.includes(username)) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user !== username)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, username]);
    }
  };

  const handleCategoryCheckboxChange = (username, category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = { ...prevSelectedCategories };

      if (!updatedCategories[username]) {
        updatedCategories[username] = [];
      }

      const index = updatedCategories[username].indexOf(category);

      if (index === -1) {
        updatedCategories[username].push(category);
      } else {
        updatedCategories[username].splice(index, 1);
      }

      return updatedCategories;
    });
  };

  const handleSaveChanges = () => {
    for (const username of selectedUsers) {
      if (
        !selectedCategories[username] ||
        selectedCategories[username].length === 0
      ) {
        console.log(
          `Please select at least one category for user ${username}.`
        );
        setAlert(true);
        return;
      }
    }

    console.log("Selected Users:", selectedUsers);
    console.log("Selected Categories:", selectedCategories);
    setOpenModal(false);
  };

  // Fake user data
  const userData = [
    {
      username: "john_doe",
      email: "john@example.com",
      categories: ["Category1", "Category2"],
    },
    {
      username: "jane_smith",
      email: "jane@example.com",
      categories: ["Category2"],
    },
    {
      username: "bob_jones",
      email: "bob@example.com",
      categories: ["Category1"],
    },
    {
      username: "test",
      email: "john@example.com",
      categories: ["Category1", "Category2"],
    },
    {
      username: "test2",
      email: "jane@example.com",
      categories: ["Category2"],
    },
    {
      username: "test3",
      email: "bob@example.com",
      categories: ["Category1"],
    },
  ];

  const categories = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];

  // Filtered user data based on the search query
  const filteredUserData = userData.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      show={openModal}
      size={"7xl"}
      onClose={() => setOpenModal(false)}
      className="modalt"
    >
      <form>
        <Modal.Header>Assign Supperusers</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Superusers are users who have the ability to moderate the site.
              They can verify papers in the categories they are assigned to, but
              they cannot create new supperusers.
            </p>
            <div className="space-y-6 ">
              <input
                type="search"
                id="default-search"
                className="block  p-4 ps-5 text-sm text-gray-900 border border-transparent rounded-lg  "
                placeholder="Search Mockups, Logos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {alert && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> Be careful with
                the categories you assign to users.
              </Alert>
            )}
            <div className="overflow-y-auto max-h-[400px]">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="p-4"></Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {filteredUserData.map((user) => (
                    <Table.Row
                      key={user.username}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="p-4">
                        <Checkbox
                          color="blue"
                          checked={selectedUsers.includes(user.username)}
                          onChange={() => handleCheckboxChange(user.username)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell className="flex flex-col flex-wrap h-[10em] gap-1">
                        {categories.map((category) => (
                          <div key={category} className="mb-1 flex gap-1">
                            <Checkbox
                              color="blue"
                              checked={
                                selectedCategories[user.username] &&
                                selectedCategories[user.username].includes(
                                  category
                                )
                              }
                              onChange={() =>
                                handleCategoryCheckboxChange(
                                  user.username,
                                  category
                                )
                              }
                            />

                            <Badge
                              className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                              color={
                                selectedCategories[user.username] &&
                                selectedCategories[user.username].includes(
                                  category
                                )
                                  ? "blue"
                                  : "failure"
                              }
                            >
                              {category}
                            </Badge>
                          </div>
                        ))}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            outline
            pill
            gradientDuoTone="purpleToBlue"
            onClick={() => handleSaveChanges()}
            type="submit"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

ModalDashboard.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ModalDashboard;
