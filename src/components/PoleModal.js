import React, { useState } from "react";
import {
  Button,
  Form,
  Modal,
  TextArea,
  TransitionablePortal,
} from "semantic-ui-react";
import { createPole, updatePoleById } from "../services/light";

const defaultValue = {
  formData: {
    name: "",
    lat: "",
    long: "",
    image: "",
    address: "",
  },
};

const PoleModal = ({ isOpen, handleClose, defaultPole, callback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(
    defaultPole || defaultValue.formData
  );

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (defaultPole._id) {
      setIsLoading(true);
      updatePoleById(defaultPole._id, formData)
        .then(() => {
          callback && callback(formData);
          handleClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createPole(formData)
        .then(() => {
          handleClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <TransitionablePortal
      open={isOpen}
      transition={{
        animation: "scale",
        duration: 300,
      }}
    >
      <Modal open onClose={handleClose} size="small" closeIcon>
        <Modal.Header>
          {" "}
          {defaultPole ? "Update Pole Data" : "Add New Pole"}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              value={formData.name}
              required
              name="name"
              label="Pole Name"
              placeholder="Pole Name"
              onChange={handleChange}
            />
            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                name="lat"
                value={formData.lat}
                label="Latitude"
                placeholder="Latitude"
                onChange={handleChange}
              />
              <Form.Input
                required
                fluid
                value={formData.long}
                name="long"
                label="Longtitude"
                placeholder="Longtitude"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Input
              required
              value={formData.image}
              label="Image URL"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />
            <Form.Field
              required
              control={TextArea}
              name="address"
              value={formData.address}
              label="Address"
              placeholder="Address"
              onChange={handleChange}
            />
            <Button loading={isLoading}>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  );
};

export default PoleModal;
