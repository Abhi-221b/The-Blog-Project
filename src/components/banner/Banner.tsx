import "./Banner.css";
import Button from "../button/Button";
import Container from "../container/Container";

interface BannerProps {
    bannerData: {
        title: string,
        subtitle: string,
        image?: string,
        button: string;
    };
    overlay?: boolean;
}



export default function Banner({ bannerData, overlay = false }: BannerProps) {
    return (
        <>
            <div className="banner-section" style={{ backgroundImage: `url(${bannerData.image})` }}>
                {overlay && <div 
                className="overlay absolute inset-0 w-full h-full z-0 bg-[rgba(0,0,0,0.5)]">
                    </div>}
                <Container>                
                    <div className="inner_section">
                        <h1 className="title">{bannerData.title}</h1>
                        <div className="description">{bannerData.subtitle}</div>
                        <Button>
                            {bannerData.button}
                        </Button>
                    </div>               
                </Container>
            </div>
        </>
    )
}