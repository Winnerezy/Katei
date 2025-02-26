"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Textarea,
  Input,
  CircularProgress,
} from "@nextui-org/react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createFlashCardDeck } from "@/lib/actions";
import { fetchDecks } from "@/lib/redux/thunk";
import { AppDispatch } from "@/lib/redux/store";
import { Box } from "@mui/material";
import { closeDeckModel } from "@/lib/redux/flashCardSlice";

export default function CreateDeckModalModal() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const state = useSelector((state: any) => state.flashcard.deckmodal);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await createFlashCardDeck(
        name,
        description
      );
      dispatch(fetchDecks());

      setName("");
      setDescription("");
      dispatch(closeDeckModel());
    } catch (error: any) {
      console.error("Error creating item:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={state}
      onClose={() => dispatch(closeDeckModel())}
    >
      <Box className="max-w-[1000px] w-full h-[500px] mx-2 p-6 flex flex-col bg-white rounded-lg absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] gap-8">
        <div className="flex gap-4 w-full items-center">
          <p className="text-xl font-bold">New Deck</p>
        </div>
        <section className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-6 w-full outline-none">
            <Input placeholder="Enter the name" onChange={handleName} />
            <Textarea
              placeholder="Enter the description"
              maxLength={300}
              onChange={handleDescription}
            />
          </div>
        </section>
        <div className="absolute right-6 bottom-6 flex gap-4">
          <Button
            className="w-24 h-10 bg-transparent"
            onClick={() => dispatch(closeDeckModel())}
          >
            Close
          </Button>
          <Button
            className="bg-[--bg] w-24 h-10 flex items-center justify-center text-center"
            onClick={handleAdd}
          >
            {isLoading ? <CircularProgress size="sm" /> : <p>Add</p>}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
