/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";

import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStore } from "../hooks/useStore";
import { Rating, ThinStar } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { BtnSquarePrm } from "../components/BtnSquarePrm";
import { list } from "postcss";

export const ListingPreview = () => {
	const [item, setItem] = useState<any>({});
	const { id, listing } = useParams();
	const [lister, setLister] = useState<any>({});
	const [activeSection, setActiveSection] = useState<string>("description");
	const [rating, setRating] = React.useState<number>(0);
	const review = useRef<any>();
	const store = useStore();

	const getDetails = async () => {
		try {
			const res = await axios.get(`${store.url}/${listing}/${id}`, {
				withCredentials: true,
				headers: { Authorization: `Bearer ${store.auth.token}` },
			});
			setItem(res.data[`${listing}`]);
		} catch (error) {
			// console.log(error);
			return error;
		}
	};

	const handleSectionClick = (sectionName: string) => {
		setActiveSection(sectionName);
	};

	// console.log(rating);
	const getListerDetails = async () => {
		try {
			const res = await axios.get(
				`${store.url}/profile/${listing}?userId=${item?.UserId}`,
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${store.auth.token}` },
				}
			);
			if (!res) {
				console.log("something went wrong");
				return null;
			}
			console.log(res);
			setLister({ ...res.data.existingProfile, rating: res.data.rating });
		} catch (error) {
			// console.log(error);
			return error;
		}
	};

	useEffect(() => {
		if (store.auth.token) {
			getDetails();
		}
	}, [store.auth.token]);

	useEffect(() => {
		if (item) {
			getListerDetails();
		}
	}, [item]);
	console.log(lister);

	const myStyles = {
		itemShapes: ThinStar,
		activeFillColor: "#ffb700",
		inactiveFillColor: "#fbf1a9",
	};

	const postReview = async () => {
		try {
			console.log(`${store.url}/profile/${listing}/review/${item?.id}`);
			const res = await axios.post(
				`${store.url}/profile/${listing}/review/${item?.id}`,
				{
					message: review.current.value,
				},
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${store.auth.token}` },
				}
			);
			console.log("review", res);
		} catch (error) {
			console.log(error);
		}
	};
	const postRating = async () => {
		try {
			console.log(`${store.url}/profile/${listing}/rating/${item?.id}`);
			const res = await axios.post(
				`${store.url}/profile/${listing}/rating/${item?.id}`,
				{
					noOfStars: rating,
				},
				{
					withCredentials: true,
					headers: { Authorization: `Bearer ${store.auth.token}` },
				}
			);
			console.log("rating", res);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePost = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		postRating();
		postReview();
	};

	function convertRating(rate: string) {
		if (rate) {
			const format = rate?.split("%")[0];
			const per = Number(format) / 100;
			const ans = per * 5;
			// console.log(ans);
			return ans;
		} else return 0;
	}

	return (
		<div>
			<Navbar />
			<section className="px-32 py-6 mt-6">
				<div className="bg-white rounded-[43px] flex ">
					<div className="flex justify-between gap-12">
						<div className="p-8">
							<img
								src={item.images && item?.images[0]}
								className="w-[42rem] h-[41rem] rounded-[3rem] "
								alt=""
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="px-32 py-6 mt-6">
				<div className="bg-white flex flex-col p-12 rounded-lg">
					<div className="flex justify-between items-center w-full">
						<div className="flex flex-col">
							<h1 className="text-3xl font-bold my-2">{item?.name}</h1>
							<p className="text-gray-500">
								{item?.address}, {item?.city}, {item?.state}
							</p>
						</div>
						<div className="flex gap-4 items-center">
							<Rating
								style={{ maxWidth: 150 }}
								value={convertRating(lister?.rating)}
								readOnly
								halfFillMode="svg"
								itemStyles={myStyles}
							/>
						</div>
					</div>
					<p className="mt-4 text-[#A19A9AFC] font-semibold"></p>
					<>
						<div className="flex items-center gap-4">
							{/* Section 1 */}
							<p
								onClick={() => handleSectionClick("description")} // Handle click to set active section
								className={`text-lg font-medium mt-4 hover:border-b-2 border-[#0D267D] cursor-pointer ${
									activeSection === "description"
										? "text-[#0D267D] border-b-2"
										: ""
								}`}
							>
								Description
							</p>
							{/* Section 2 */}
							<p
								onClick={() => handleSectionClick("section2")}
								className={`text-lg font-medium  mt-4 hover:border-b-2 border-[#0D267D] cursor-pointer ${
									activeSection === "section2"
										? "text-[#0D267D] border-b-2"
										: ""
								}`}
							>
								{listing === "service" ? "Artisan Details" : "Agent Details"}
							</p>
							{/* Section 3 */}
							<p
								onClick={() => handleSectionClick("section3")}
								className={`text-lg font-medium mt-4 hover:border-b-2 border-[#0D267D] cursor-pointer ${
									activeSection === "section3"
										? " border-b-2 text-[#0D267D]"
										: ""
								}`}
							>
								{listing === "service" ? "Artisan Reviews" : "Agent Reviews"}
							</p>
						</div>
						<div className="mt-4">
							{/* Content of the active section */}
							{activeSection === "description" && (
								<p className="text-[#777474] font-normal text-lg">
									{item?.description}
								</p>
							)}
							{activeSection === "section2" && (
								<div className="grid text-xl gap-12">
									<div className="flex gap-56">
										<div>
											<h2 className="text-[#878788] ">
												{listing === "service" ? "Artisan" : "Agent"} name
											</h2>
											<p>
												{lister?.User?.firstName} {lister?.User?.lastName}
											</p>
										</div>
										<div>
											<h2 className="text-[#878788]">Company name</h2>
											<p>{lister?.brandName}</p>
										</div>
									</div>
									<div className="flex gap-56">
										<div>
											<h2 className="text-[#878788]">Phone Number</h2>
											<p>{lister?.phoneNumber}</p>
										</div>
										<div className="flex gap-4 items-center">
											<svg
												width="26"
												height="25"
												viewBox="0 0 26 25"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12.8125 25C14.2261 25 15.3827 23.8462 15.3827 22.4359H10.2423C10.2423 23.8462 11.3989 25 12.8125 25ZM20.5231 17.3077V10.8974C20.5231 6.96154 18.4284 3.66667 14.7402 2.79487V1.92308C14.7402 0.858974 13.8791 0 12.8125 0C11.7459 0 10.8848 0.858974 10.8848 1.92308V2.79487C7.20944 3.66667 5.10187 6.94872 5.10187 10.8974V17.3077L2.53166 19.8718V21.1538H23.0933V19.8718L20.5231 17.3077ZM17.9529 18.5897H7.67208V10.8974C7.67208 7.71795 9.61259 5.12821 12.8125 5.12821C16.0124 5.12821 17.9529 7.71795 17.9529 10.8974V18.5897ZM7.13233 2.02564L5.29463 0.192308C2.21038 2.53846 0.179915 6.15385 0 10.2564H2.57021C2.76298 6.85897 4.51072 3.88462 7.13233 2.02564ZM23.0548 10.2564H25.625C25.4322 6.15385 23.4018 2.53846 20.3304 0.192308L18.5055 2.02564C21.1014 3.88462 22.862 6.85897 23.0548 10.2564Z"
													fill="black"
												/>
											</svg>

											<h2>Turn on post notifications for this lister</h2>
										</div>
									</div>
								</div>
							)}
							{activeSection === "section3" && (
								<div className="flex justify-between">
									<div>
										{lister?.Reviews?.map((review: any) => (
											<div className="flex gap-3">
												<div className="w-10 h-10">
													{/* <img src={lister?.Reviews[0].User.firstname} /> */}
													<div>{review.User.firstName}</div>
												</div>
												<div>{review.message}</div>
											</div>
										))}
									</div>
									<div>
										<div className="flex text-lg gap-4 mb-3">
											<p>Rate this {lister && listing} provider</p>
											<Rating
												style={{ maxWidth: 150 }}
												value={rating}
												onChange={setRating}
												halfFillMode="svg"
												itemStyles={myStyles}
											/>
										</div>
										<p className="text-lg">Add Review</p>
										<textarea
											name="review"
											ref={review}
											className="border-[#e3e3e3] w-[37rem] h-[10rem] border rounded-[0.06rem] outline-none p-4"
										/>
										<div className="mr-auto" onClick={handlePost}>
											<BtnSquarePrm text="Send" />
										</div>
									</div>
								</div>
							)}
						</div>
					</>
				</div>
			</section>
			<Footer />
		</div>
	);
};
