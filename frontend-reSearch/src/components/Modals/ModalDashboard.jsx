import { Button, Modal, Checkbox, Table, Alert, Badge } from "flowbite-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HiInformationCircle } from "react-icons/hi";

function ModalDashboard({ openModal, setOpenModal, apiUrl, categories }) {
  const [userData, setUserData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl + "/dashboard.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          console.log(data.allusers);
          for (const user of data.allusers) {
            if (user.UserCategories !== null) {
              user.UserCategories = JSON.parse(user.UserCategories);

              // Extract only category IDs from user.UserCategories
              const categoryIds = user.UserCategories.map((category) =>
                parseInt(category.CategoryID)
              );
              console.log(categoryIds);
              // Populate selectedData for users with existing categories
              setSelectedData((prevSelectedData) => {
                const updatedData = { ...prevSelectedData };
                updatedData[user.UserID] = {
                  userId: user.UserID,
                  categories: categoryIds,

                  IsSuperuser: parseInt(user.IsSuperuser),
                };
                return updatedData;
              });
            }
          }
          setUserData(data.allusers);
          setLoading(false);
        }
      });
  }, []);

  const handleCheckboxChange = (user) => {
    setSelectedData((prevSelectedData) => {
      const updatedData = { ...prevSelectedData };

      if (updatedData[user] && updatedData[user].IsSuperuser == 1) {
        // If user is in selectedData, remove it
        updatedData[user].categories = [];
        updatedData[user].IsSuperuser = 0;
      } else {
        // If user is not in selectedData, add it with empty categories array
        updatedData[user] = { userId: user, categories: [], IsSuperuser: 1 };
      }

      console.log(updatedData);
      return updatedData;
    });
  };

  const handleCategoryCheckboxChange = (user, category) => {
    setSelectedData((prevSelectedData) => {
      const updatedData = { ...prevSelectedData };

      if (!updatedData[user]) {
        updatedData[user] = {
          userId: user,
          categories: [],
          IsSuperuser: 0,
        };
      }

      const index = updatedData[user].categories.indexOf(category);

      if (index === -1) {
        // If category is not selected, add it
        updatedData[user].categories.push(category);
        updatedData[user].IsSuperuser = 1;
      } else {
        // If category is selected, remove it
        updatedData[user].categories.splice(index, 1);

        // If all categories are deselected, remove the user
        if (updatedData[user].categories.length == 0) {
          updatedData[user].IsSuperuser = 0;
        }
      }

      console.log(updatedData);

      return updatedData;
    });
  };

  const handleSaveChanges = () => {
    event.preventDefault();

    for (const userId of Object.keys(selectedData)) {
      if (selectedData[userId].IsSuperuser == 0) {
        continue;
      } else if (
        !selectedData[userId] ||
        selectedData[userId].categories.length == 0
      ) {
        console.log(`Please select at least one category for user ${userId}.`);
        console.log(selectedData[userId]);
        setAlert(true);

        return;
      }
    }

    console.log("Selected Data:", selectedData);

    fetch(apiUrl + "/dashboard.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ selectedData: selectedData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpenModal(false);
      });
  };

  // Filtered user data based on the search query
  const filteredUserData = userData.filter((user) =>
    user.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      show={openModal}
      size={"7xl"}
      onClose={() => setOpenModal(false)}
      className="modalt"
    >
      {loading ? (
        // Render loading indicator or message
        <p>Loading...</p>
      ) : (
        <form>
          <Modal.Header>Assign Superusers</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Superusers are users who have the ability to moderate the site.
                They can verify papers in the categories they are assigned to,
                but they cannot create new superusers.
              </p>
              <div className="space-y-6 ">
                <input
                  type="search"
                  id="default-search"
                  className="block  p-4 ps-5 text-sm text-gray-900 border border-transparent rounded-lg  "
                  placeholder="Search Users by Username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {alert && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">Info alert!</span> Be careful
                  with the categories you assign to users.
                </Alert>
              )}
              <div className="overflow-y-auto max-h-[400px]">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell className="p-4"></Table.HeadCell>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {filteredUserData.map((user) => (
                      <Table.Row
                        key={user.UserID}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="p-4">
                          <Checkbox
                            color="blue"
                            onChange={() => handleCheckboxChange(user.UserID)}
                            checked={
                              selectedData[user.UserID]
                                ? selectedData[user.UserID].IsSuperuser
                                  ? true
                                  : false
                                : false
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {user.UserID}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {user.Username}
                        </Table.Cell>
                        <Table.Cell>{user.Email}</Table.Cell>
                        <Table.Cell className="flex flex-col flex-wrap h-[10em] gap-1">
                          {categories.map((category) => (
                            <div
                              key={category.CategoryID}
                              className="mb-1 flex gap-1"
                            >
                              <Badge
                                className="rounded-lg transition duration-100 ease-in transform hover:scale-105"
                                onClick={() =>
                                  handleCategoryCheckboxChange(
                                    user.UserID,
                                    category.CategoryID
                                  )
                                }
                                color={
                                  selectedData[user.UserID] &&
                                  selectedData[user.UserID].categories.includes(
                                    category.CategoryID
                                  )
                                    ? category.CategoryColor
                                    : "failure"
                                }
                              >
                                {category.CategoryName}
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
      )}
    </Modal>
  );
}

ModalDashboard.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

export default ModalDashboard;
