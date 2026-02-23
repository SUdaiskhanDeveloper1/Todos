import React, { useState } from "react";
import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Select,
    HStack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const TaskInput = ({ addTodo }) => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("Medium");
    const bg = useColorModeValue("white", "gray.700");

    const handleSubmit = () => {
        if (value.trim()) {
            addTodo(value, priority);
            setValue("");
            setPriority("Medium");
        }
    };

    return (
        <Box p={4} bg={bg} borderRadius="xl" boxShadow="md" mb={6}>
            <VStack spacing={4}>
                <HStack w="100%">
                    <InputGroup size="lg">
                        <Input
                            placeholder="What needs to be done?"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                            variant="filled"
                            borderRadius="lg"
                            _focus={{ borderColor: "blue.400", bg: useColorModeValue("white", "gray.600") }}
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                                h="1.75rem"
                                size="sm"
                                colorScheme="blue"
                                icon={<AddIcon />}
                                onClick={handleSubmit}
                                aria-label="Add task"
                            />
                        </InputRightElement>
                    </InputGroup>
                </HStack>
                <HStack w="100%" justify="flex-end">
                    <Select
                        size="sm"
                        w="120px"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        borderRadius="md"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                </HStack>
            </VStack>
        </Box>
    );
};

export default TaskInput;
