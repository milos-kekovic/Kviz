// https://@rneui/themed.github.io/@rneui/themed/docs/icon
import React, { useContext } from 'react';
import { Icon } from '@rneui/themed';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Dimensions, Platform } from 'react-native';
import { Colors, ThemeContext } from '../Context';

const { fontScale, width, height } = Dimensions.get('window');

const closeStyle = (color = 'red') => {
	return {
		position: 'absolute',
		top: 0,
		backgroundColor: color,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		width: width * 0.07,
		height: width * 0.07,
		borderRadius: width * 0.07,
		zIndex: 3,
		elevation: 3
	};
};

//----------------------------------DRAWER ----------------------------------
function SignOutIcon({ size = 30 * fontScale, color = 'white', ...rest }) {
	return <Icon name="exit-to-app" size={size} color={color} {...rest} />;
}
function NightIcon({ size = 30 * fontScale, color = 'orange', name = { name }, ...rest }) {
	return <Icon name={name} size={size} color={color} {...rest} />;
}
function SearchIcon({ size = 30 * fontScale, color = 'white', ...rest }) {
	return <Icon name="search" size={size} color={color} {...rest} />;
}
//---------------------------------------------------------------------------

function CloseIcon({
	size = 30 * fontScale,
	color = 'white',
	containerStyle,
	dontUseCloseStyle = false,
	containerColor = 'red',
	isPopup = false,
	...rest
}) {
	return (
		<Icon
			name="close"
			size={size}
			color={color}
			containerStyle={[ dontUseCloseStyle ? {} : closeStyle(containerColor, isPopup), containerStyle ]}
			{...rest}
		/>
	);
}
function DotsIcon({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="more-vert" size={size} color={color} {...rest} />;
}
function FilterIcon({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="filter-list" size={size} color={color} {...rest} />;
}
function ListIcon({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="list" size={size} color={color} {...rest} />;
}
function FavoriteIcon({ size = 40 * fontScale, color = 'white', isOn = false, ...rest }) {
	return <Icon name={isOn ? 'star' : 'star-border'} size={size} color={color} {...rest} />;
}

function PlusIcon({ size = 30 * fontScale, color = 'white', useContainer = false, ...rest }) {
	return (
		<Icon
			name="add"
			size={size}
			color={color}
			containerStyle={useContainer ? closeStyle(Colors.green) : {}}
			{...rest}
		/>
	);
}

function MinusIcon({ size = 30 * fontScale, color = 'white', useContainer = false, ...rest }) {
	return (
		<Icon
			name="remove"
			size={size}
			color={color}
			containerStyle={useContainer ? closeStyle(Colors.orange) : {}}
			{...rest}
		/>
	);
}
function MenuIcon({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="menu" size={size} color={color} {...rest} />;
}
// TODO
function InformationIcon({ size = 30 * fontScale, color = 'white', ...rest }) {
	return <Icon name="help-outline" size={size} color={color} {...rest} />;
}

function CalendarIcon({ size = 50 * fontScale, color = 'white', ...rest }) {
	return <Icon name="ios-calendar" type="ionicon" size={size} color={color} {...rest} />;
}

function UpIcon({ size = 35 * fontScale, ...rest }) {
	const { theme } = useContext(ThemeContext);
	return <Icon name="keyboard-arrow-up" size={size} color={theme.text} {...rest} />;
}
function DownIcon({ size = 35 * fontScale, ...rest }) {
	const { theme } = useContext(ThemeContext);
	return <Icon name="keyboard-arrow-down" size={size} color={theme.text} {...rest} />;
}

function LeftIcon({ size = 50 * fontScale, ...rest }) {
	return <Icon name="keyboard-arrow-left" type="MaterialCommunityIcons" size={size} color={'white'} {...rest} />;
}
function RightIcon({ size = 50 * fontScale, ...rest }) {
	const { theme } = useContext(ThemeContext);
	return <Icon name="keyboard-arrow-right" size={size} color={theme.text} {...rest} />;
}
function DeleteIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="delete" size={size} color={color} {...rest} />;
}
function PenIcon({ size = 30 * fontScale, ...rest }) {
	const { theme } = useContext(ThemeContext);
	return <Icon name="edit" size={size} color={theme.text} {...rest} />;
}
function CheckIcon({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="check" size={size} color={color} {...rest} />;
}

function ChatIcon({ size = 50 * fontScale, color = 'red', ...rest }) {
	return <Icon name="chat" type="Entypo" size={size} color={color} {...rest} />;
}

function XIcon({ size = 50 * fontScale, color = 'white', ...rest }) {
	return <Icon name="close" size={size} color={color} {...rest} />;
}
function HelpIcon({ size = 30 * fontScale, color = 'white', isOutline = false, ...rest }) {
	return <Icon name={isOutline ? 'help-outline' : 'help'} size={size} color={color} {...rest} />;
}

function PlayIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="play-arrow" size={size} color={color} {...rest} />;
}

function RefereeIcon({ size = 20 * fontScale, color = 'white', ...rest }) {
	return <MaterialCommunityIcons name="whistle-outline" size={size} color={color} {...rest} />;
}

function AttachIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="attachment" size={size} color={color} {...rest} />;
}

function PlaceIcon({ size = 20 * fontScale, color = 'white', ...rest }) {
	return <Icon name="place" size={size} color={color} {...rest} />;
}

function ClockIcon({ size = 20 * fontScale, color = 'white', ...rest }) {
	return <Icon name="access-time" size={size} color={color} {...rest} />;
}

function CameraIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="add-a-photo" size={size} color={color} {...rest} />;
}

function MicrophoneIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="mic" size={size} color={color} {...rest} />;
}

function MessageIcon({ size = 27 * fontScale, color = 'white', ...rest }) {
	return <Icon name="textsms" size={size} color={color} {...rest} />;
}

function AddPersonIcon({ size = 30 * fontScale, color = 'white', ...rest }) {
	return <Icon name="person-add" size={size} color={color} {...rest} />;
}

//---------------------------------- Stream ----------------------------------
function Pause({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="pause" size={size} color={color} {...rest} />;
}
function Play({ size = 40 * fontScale, color = 'white', ...rest }) {
	return <Icon name="play-arrow" size={size} color={color} {...rest} />;
}
//----------------------------------------------------------------------------

//---------------------------------- FolderPopup ----------------------------------
function FolderIcon({ size = 50 * fontScale, color = Colors.blue, ...rest }) {
	return <Icon name="folder" size={size} color={color} {...rest} />;
}

function AddFolderIcon({ size = 50 * fontScale, color = Colors.blue, ...rest }) {
	return <Icon name="create-new-folder" size={size} color={color} {...rest} />;
}
function LockIcon({ size = 25 * fontScale, color = 'white', ...rest }) {
	return <Icon name="lock" size={size} color={color} {...rest} />;
}

function AwardIcon({ size = 18 * fontScale, color = 'white', ...rest }) {
	return <FontAwesome5 name="award" size={size} color={color} {...rest} />;
}
//----------------------------------------------------------------------------
export {
	Icon,
	HelpIcon,
	XIcon,
	SignOutIcon,
	FilterIcon,
	CloseIcon,
	FavoriteIcon,
	PlusIcon,
	MenuIcon,
	InformationIcon,
	SearchIcon,
	UpIcon,
	DownIcon,
	LeftIcon,
	RightIcon,
	DeleteIcon,
	MessageIcon,
	MinusIcon,
	PenIcon,
	CheckIcon,
	ClockIcon,
	ChatIcon,
	CalendarIcon,
	NightIcon,
	PlayIcon,
	RefereeIcon,
	AttachIcon,
	PlaceIcon,
	CameraIcon,
	MicrophoneIcon,
	DotsIcon,
	Pause,
	Play,
	FolderIcon,
	AddFolderIcon,
	LockIcon,
	AddPersonIcon,
	ListIcon,
	AwardIcon
};
