import { useClerk } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaFileExcel } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi2';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { IoClose, IoSettings } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { SiGoogledocs } from 'react-icons/si';
import { TfiMenuAlt } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';

function SideBar() {
	const { signOut } = useClerk();
	const navigate = useNavigate();
	const [showSubmenu, setShowSubmenu] = useState(false);
	const [showMenu, setShowMenu] = useState(true);

	//Excel link
	const [showSubexcel, setShowSubexcel] = useState(false);

	return (
		<>
			<div
				className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-full md:w-[40%] lg:w-[30%] xl:w-auto h-full  top-0 p-4 flex flex-col justify-between z-10 bg-base-800 ${
					showMenu ? 'left-0' : '-left-full'
				} transition-all`}
			>
				<div>
					<h1 className="text-2xl font-bold text-center mb-10">
						CVCraft
						<span className="font-extrabold text-accent-yellow text-4xl">
							.
						</span>
					</h1>
					<ul>
						<li>
							<Link
								to="/home"
								onClick={() => setShowMenu(!showMenu)}
								className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate`}
							>
								<span className="text-accent-green">
									<FaHome />
								</span>
								Home
							</Link>
						</li>
						<li>
							<button
								onClick={() => setShowSubmenu(!showSubmenu)}
								className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate`}
							>
								<span className="text-accent-green flex items-center gap-2">
									<SiGoogledocs />
								</span>
								Curriculums
								<IoIosArrowDropdownCircle
									className={`mt-1 ${
										showSubmenu && 'rotate-180 transition-all'
									}`}
								/>
							</button>
							<ul
								className={`${
									showSubmenu ? 'h-[80px] my-4' : 'h-0'
								} overflow-y-hidden transition-all duration-300`}
							>
								<li>
									<Link
										to="/curriculums"
										onClick={() => {
											setShowSubmenu(!showSubmenu);
											setShowMenu(!showMenu);
										}}
										className="py-2 px-4 border-l-2 border-custom-gray ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-custom-gray before:rounded-full before:-left-[7px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-base-800 text-custom-gray hover:text-custom-mate hover:before:bg-accent-yellow transition-colors duration-300"
									>
										Ver
									</Link>
								</li>
								<li>
									<Link
										to="/curriculums/new"
										onClick={() => {
											setShowSubmenu(!showSubmenu);
											setShowMenu(!showMenu);
										}}
										className="py-2 px-4 border-l-2 border-custom-gray ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-custom-gray before:rounded-full before:-left-[7px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-base-800 text-custom-gray hover:text-custom-mate hover:before:bg-accent-yellow transition-colors duration-400"
									>
										Agregar
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<button
								onClick={() => setShowSubexcel(!showSubexcel)}
								className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate`}
							>
								<span className="text-accent-green flex items-center gap-2">
									<FaFileExcel />
								</span>
								Excel
								<IoIosArrowDropdownCircle
									className={`mt-1 ${
										showSubexcel && 'rotate-180 transition-all'
									}`}
								/>
							</button>
							<ul
								className={`${
									showSubexcel ? 'h-[80px] my-4' : 'h-0'
								} overflow-y-hidden transition-all duration-300`}
							>
								<li>
									<Link
										to="/excelsheets"
										onClick={() => {
											setShowSubexcel(!showSubexcel);
											setShowMenu(!showMenu);
										}}
										className="py-2 px-4 border-l-2 border-custom-gray ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-custom-gray before:rounded-full before:-left-[7px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-base-800 text-custom-gray hover:text-custom-mate hover:before:bg-accent-yellow transition-colors duration-300"
									>
										Ver
									</Link>
								</li>
								<li>
									<Link
										to="/excelsheets/new"
										onClick={() => {
											setShowSubexcel(!showSubexcel);
											setShowMenu(!showMenu);
										}}
										className="py-2 px-4 border-l-2 border-custom-gray ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-custom-gray before:rounded-full before:-left-[7px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-base-800 text-custom-gray hover:text-custom-mate hover:before:bg-accent-yellow transition-colors duration-400"
									>
										Agregar
									</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link
								to="/team"
								onClick={() => setShowMenu(!showMenu)}
								className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate`}
							>
								<span className="text-accent-green">
									<HiUserGroup />
								</span>
								Team
							</Link>
						</li>
						<li>
							<Link
								to="/email"
								onClick={() => setShowMenu(!showMenu)}
								className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate`}
							>
								<span className="text-accent-green">
									<MdEmail />
								</span>
								Email
							</Link>
						</li>
						<li>
							<Link
								to="#"
								onClick={() => setShowMenu(!showMenu)}
								className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-zinc-700 font-semibold transition-colors duration-300 w-full text-custom-gray hover:text-custom-mate"
							>
								<span className="text-accent-green">
									<IoSettings />
								</span>
								Settings
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<button
						className="flex items-center gap-4 py-2 px-4 rounded-lg hover:text-accent-yellow text-custom-gray transition-color duration-300 ease-in-out font-semibold"
						onClick={() => signOut(() => navigate('/'))}
					>
						<PiSignOutBold className="" />
						Logout{' '}
					</button>
				</div>
			</div>
			<button
				onClick={() => setShowMenu(!showMenu)}
				className="xl:hidden fixed bottom-4 right-4 bg-accent-yellow text-base-900 p-2 rounded-full z-10"
			>
				{showMenu ? <IoClose /> : <TfiMenuAlt />}
			</button>
		</>
	);
}

export default SideBar;
