import React from "react";
import {
    VStack,
    Button,
    Icon,
    Text,
    Box,
    Flex,
    useColorModeValue,
    Tooltip,
} from "@chakra-ui/react";
import {
    MdDashboard,
    MdAddCircle,
    MdPendingActions,
    MdCheckCircle,
    MdStar,
} from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

const Sidebar = ({ activeSection, setActiveSection, counters }) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const activeBg = useColorModeValue("blue.50", "blue.900");
    const activeColor = useColorModeValue("blue.600", "blue.200");

    const NavItem = ({ icon, label, section }) => {
        const isActive = activeSection === section;
        const count = counters ? counters[section] : 0;

        return (
            <Tooltip label={label} placement="right" display={{ base: "none", md: "block" }}>
                <Button
                    variant="ghost"
                    w="100%"
                    justifyContent="space-between"
                    onClick={() => setActiveSection(section)}
                    bg={isActive ? activeBg : "transparent"}
                    color={isActive ? activeColor : "gray.500"}
                    _hover={{
                        bg: isActive ? activeBg : useColorModeValue("gray.100", "gray.700"),
                    }}
                    leftIcon={<Icon as={icon} boxSize={5} />}
                    px={4}
                    py={6}
                    borderRadius="lg"
                    transition="all 0.2s"
                >
                    <Flex flex={1} justify="space-between" align="center">
                        <Text fontSize="md" fontWeight={isActive ? "bold" : "medium"}>
                            {label}
                        </Text>
                        {count > 0 && (
                            <Badge
                                ml={2}
                                variant="subtle"
                                colorScheme={isActive ? "blue" : "gray"}
                                borderRadius="full"
                                px={2}
                            >
                                {count}
                            </Badge>
                        )}
                    </Flex>
                </Button>
            </Tooltip>
        );
    };

    return (
        <Box
            as="nav"
            w={{ base: "full", md: "250px" }}
            h={{ base: "auto", md: "100vh" }}
            bg={bgColor}
            borderRight="1px"
            borderColor={borderColor}
            py={8}
            px={4}
            position={{ base: "relative", md: "sticky" }}
            top={0}
            zIndex={10}
        >
            <Flex mb={10} px={2} align="center">
                <Icon as={MdDashboard} boxSize={8} color="blue.500" mr={3} />
                <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                    TaskMaster
                </Text>
            </Flex>

            <VStack spacing={2} align="stretch" flex={1}>
                <NavItem icon={MdAddCircle} label="New Task" section="new" />
                <NavItem icon={MdPendingActions} label="Pending" section="pending" />
                <NavItem icon={MdCheckCircle} label="Completed" section="completed" />
                <NavItem icon={MdStar} label="Bookmarked" section="bookmarked" />
            </VStack>

            <Box mt="auto" pt={10}>
                <VStack spacing={2} align="stretch">
                    <NavItem icon={DeleteIcon} label="Trash" section="trash" />
                </VStack>
            </Box>
        </Box>
    );
};

export default Sidebar;
