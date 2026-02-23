import React from "react";
import {
    Box,
    Flex,
    HStack,
    Text,
    IconButton,
    Badge,
    Checkbox,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Button,
} from "@chakra-ui/react";
import {
    EditIcon,
    DeleteIcon,
    StarIcon,
} from "@chakra-ui/icons";
import { MdMoreVert } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const TaskCard = ({
    todo,
    toggleTodo,
    toggleBookmark,
    deleteTodo,
    startEditing,
    editingId,
    editValue,
    setEditValue,
    saveEdit,
    setEditingId,
    restoreTodo,
    permanentlyDeleteTodo,
}) => {
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const mutedColor = useColorModeValue("gray.500", "gray.400");

    const priorityColors = {
        High: "red",
        Medium: "orange",
        Low: "green",
    };

    const isEditing = editingId === todo.id;

    const formatDate = (date) => {
        if (!date) return "";
        const now = new Date();
        const created = new Date(date);
        const diffInMs = now - created;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24 && diffInHours >= 1) {
            return `${diffInHours} hours ago`;
        } else if (diffInHours < 1) {
            const diffInMins = Math.floor(diffInMs / (1000 * 60));
            return diffInMins <= 0 ? "Just now" : `${diffInMins} minutes ago`;
        }

        return created.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: todo.deleted ? 50 : -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <Box
                p={4}
                bg={todo.bookmarked ? useColorModeValue("yellow.50", "yellow.900") : cardBg}
                borderWidth="1px"
                borderColor={todo.bookmarked ? "yellow.200" : borderColor}
                borderRadius="xl"
                boxShadow="sm"
                _hover={{ boxShadow: "md", transform: "translateY(-1px)" }}
                transition="all 0.2s"
                mb={3}
                opacity={todo.deleted ? 0.7 : 1}
                filter={todo.deleted ? "grayscale(40%)" : "none"}
            >
                <Flex justify="space-between" align="center">
                    {isEditing ? (
                        <HStack flex={1} spacing={3}>
                            <Input
                                size="md"
                                variant="filled"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
                                autoFocus
                            />
                            <Button size="sm" colorScheme="blue" onClick={() => saveEdit(todo.id)}>
                                Save
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                Cancel
                            </Button>
                        </HStack>
                    ) : (
                        <>
                            <HStack spacing={4} flex={1}>
                                {!todo.deleted && (
                                    <Checkbox
                                        isChecked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        colorScheme="blue"
                                        size="lg"
                                    />
                                )}
                                <Box>
                                    <Text
                                        as={todo.completed || todo.deleted ? "del" : "span"}
                                        fontSize="md"
                                        fontWeight="medium"
                                        color={todo.completed || todo.deleted ? mutedColor : textColor}
                                    >
                                        {todo.text}
                                    </Text>
                                    <Flex mt={1} wrap="wrap" gap={2} align="center">
                                        {todo.priority && !todo.deleted && (
                                            <Badge colorScheme={priorityColors[todo.priority]} variant="subtle" fontSize="0.6em">
                                                {todo.priority}
                                            </Badge>
                                        )}
                                        {todo.edited && (
                                            <Badge colorScheme="gray" fontSize="0.6em">
                                                Edited
                                            </Badge>
                                        )}
                                        <Text fontSize="xs" color="gray.400">
                                            Created: {formatDate(todo.createdAt)}
                                        </Text>
                                    </Flex>
                                </Box>
                            </HStack>

                            <HStack spacing={1}>
                                {/* Desktop Actions */}
                                <HStack display={{ base: "none", md: "flex" }} spacing={1}>
                                    {!todo.deleted ? (
                                        <>
                                            <IconButton
                                                size="sm"
                                                variant="ghost"
                                                icon={<EditIcon />}
                                                onClick={() => startEditing(todo.id, todo.text)}
                                                aria-label="Edit"
                                            />
                                            <IconButton
                                                size="sm"
                                                variant="ghost"
                                                colorScheme="red"
                                                icon={<DeleteIcon />}
                                                onClick={() => deleteTodo(todo.id)}
                                                aria-label="Move to Trash"
                                            />
                                            <IconButton
                                                size="sm"
                                                variant="ghost"
                                                colorScheme={todo.bookmarked ? "yellow" : "gray"}
                                                icon={<StarIcon />}
                                                onClick={() => toggleBookmark(todo.id)}
                                                aria-label="Bookmark"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                size="xs"
                                                variant="outline"
                                                colorScheme="green"
                                                onClick={() => restoreTodo(todo.id)}
                                            >
                                                Restore
                                            </Button>
                                            <IconButton
                                                size="sm"
                                                variant="ghost"
                                                colorScheme="red"
                                                icon={<DeleteIcon />}
                                                onClick={() => permanentlyDeleteTodo(todo.id)}
                                                aria-label="Delete Permanently"
                                            />
                                        </>
                                    )}
                                </HStack>

                                {/* Mobile Actions */}
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        icon={<MdMoreVert />}
                                        variant="ghost"
                                        size="sm"
                                        display={{ base: "flex", md: "none" }}
                                    />
                                    <MenuList>
                                        {!todo.deleted ? (
                                            <>
                                                <MenuItem icon={<EditIcon />} onClick={() => startEditing(todo.id, todo.text)}>
                                                    Edit
                                                </MenuItem>
                                                <MenuItem icon={<DeleteIcon />} color="red.500" onClick={() => deleteTodo(todo.id)}>
                                                    Move to Trash
                                                </MenuItem>
                                                <MenuItem icon={<StarIcon />} onClick={() => toggleBookmark(todo.id)}>
                                                    {todo.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                                </MenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <MenuItem onClick={() => restoreTodo(todo.id)}>Restore</MenuItem>
                                                <MenuItem icon={<DeleteIcon />} color="red.500" onClick={() => permanentlyDeleteTodo(todo.id)}>
                                                    Delete Permanently
                                                </MenuItem>
                                            </>
                                        )}
                                    </MenuList>
                                </Menu>
                            </HStack>
                        </>
                    )}
                </Flex>
            </Box>
        </motion.div>
    );
};

export default TaskCard;
