import {IOrder, IOrderContext} from "./Order";

export const defaultOrder:IOrder = {
	email:"",
	firstName: "",
	lastName: "",
	country: "",
	stateProvince: "",
	city: "",
	address1: "",
	address2: "",
	zipcode: "",
	items: [],
	paymentMethod: "",
	totalPrice: 0,
	// shippingCost: 0,
	// shipped: false,
	// received: false
}

export const defaultOrderContext:IOrderContext = {
	order: defaultOrder,
	setOrder: () => {},
	email:"",
	setEmail:() => {},
	firstName: "",
	setFirstName: () => {},
	lastName: "",
	message: "",
	setMessage: () => {},
	setLastName: () => {},
	country: "",
	setCountry: () => {},
	stateProvince: "",
	setStateProvince: () => {},
	city: "",
	setCity: () => {},
	address1: "",
	setAddress1: () => {},
	address2: "",
	setAddress2: () => {},
	zipcode: "",
	setZipcode: () => {},
	paymentMethod: "",
	setPaymentMethod: () => {},
	totalPrice: 0,
	setTotalPrice: () => {},
	// shippingCost: 0,
	// shipped: false,
	// received: false,
	createOrder: () => {}
}