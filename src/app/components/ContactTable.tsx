"use client";
import { useEffect, useState } from "react";
import ContactRow from "./ContactRow";
import ContactForm from "./ContactForm";
import useContact from "../../../hooks/useContact";
import Search from "./Search";

const ContactTable = () => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [displayForm, setDisplayForm] = useState(false);
	const [search, setSearchVal] = useState('');
	const { data: contactData = [], mutate } = useContact(search);

	useEffect(() => {
		console.log(`api/search?params=${search}`)
		if (search != "") mutate(search)
		else mutate();
		console.log(contactData)
	}, [mutate, search]);

	const deleteUserData = async (id: string) => {
		await fetch('/api/contact', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});

		mutate(); // re-fetch data after deletion
	};

	const updateUserData = async (contact: Contact) => {
		if (selectedIndex != -1) {
			await fetch('/api/contact', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(contact),
			});
		} else {
			// add new contact
			await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(contact),
			});

		}
		mutate(); // re-fetch data after adding/updating

		closeFormModal();
	};

	const closeFormModal = () => {
		setDisplayForm(false);
		setSelectedIndex(-1);
	};

	const onSearch = (param: string) => {
		setSearchVal(param)
	}

	const sortData = () => {
		let sortedContacts = [...contactData];
		sortedContacts.sort((a: Contact, b: Contact) => a.fName.localeCompare(b.fName));
		mutate(sortedContacts, false);  // pass sorted data to mutate function, false to not revalidate
  }

	return (
		<>
			<Search param={search} onSearch={onSearch} />
			<table className="table">
				<thead>
					<tr className="contact-row">
						<th>image</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone #</th>
						<th>options</th>
					</tr>
				</thead>
				{
					Array.isArray(contactData) && <tbody>
						{contactData.map((contact: Contact, index: number) => {
							return (
								<ContactRow
									key={contact.id}
									data={contact}
									onDeleteData={() => deleteUserData(contact.id)}
									onUpdateData={() => {
										setSelectedIndex(index);
										setDisplayForm(true);
									}}
								/>
							);
						})}
					</tbody>
				}
			</table>
			<div>
				<button
					className="btn btn-primary"
					onClick={() => {
						setDisplayForm(true);
					}}
				>
					Add New
				</button>
			</div>
			<br />
			<div>
				<button
					className="btn btn-secondary"
					onClick={() => {sortData()}}
				>
					Sort
				</button>
			</div>
			<ContactForm
				visible={displayForm}
				selectedIndex={selectedIndex}
				contactData={contactData}
				onUpdateData={updateUserData}
				onCloseModal={closeFormModal}
			></ContactForm>
		</>
	);
};

export default ContactTable;
