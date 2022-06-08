import Logo from '@components/ui/logo';


export default function Home() {
	return (
		<div className="w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6">
			<div className="flex items-center mx-auto max-w-[1920px] h-full w-full">

				<Logo />
			</div>
			<div className="flex">
				<div className="mx-auto mt-40 text-center">
					<p><span style={{ fontSize: '3.5em',fontWeight:'bold',color:'green' }}>365</span> <span style={{ fontSize: '2em',color:'green' }}>DAYS</span> - <span style={{ fontSize: '3.5em',fontWeight:'bold',color:'#ff6600' }}>365</span> <span style={{ fontSize: '2em',color:'#ff6600' }}>OFFERS</span></p>
					<p style={{fontSize:'2em',color:'black',fontWeight:'bold'}}><span style={{padding:'10px'}}>MEGA IT STORE AT YOUR FINGERTIPS</span></p>
					<p style={{fontSize:'2em',color:'black',fontWeight:'bold',fontFamily:'sans-serif'}}>COMING SOON...</p>
				</div>
			</div>
		</div>
	);
};


// Home.Layout = Layout;

