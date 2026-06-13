import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export function FooterLayoutPage() {
  return (
    <Footer>
      <div className="w-full">
        {/* Link columns */}
        <div className="bg-gradient-premium w-full px-6 py-8 flex justify-center lg:px-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-10 lg:gap-16 max-w-6xl w-full">
          <div>
            <FooterTitle title="Company" className="text-white/80" />
            <FooterLinkGroup col className="text-white/80">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Brand Center</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Help Center" className="text-white/80" />
            <FooterLinkGroup col className="text-white/80">
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">Twitter</FooterLink>
              <FooterLink href="#">Facebook</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </FooterLinkGroup>
          </div>
          {/* Legal: spans full width on 2-col, normal on 3-col+ */}
          <div className="col-span-2 sm:col-span-1">
            <FooterTitle title="Legal" className="text-white/80" />
            <FooterLinkGroup col className="text-white/80">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Licensing</FooterLink>
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full bg-gradient-premium border-t border-white/10 px-4 py-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:px-6 lg:px-12">
          <FooterCopyright
            href="#"
            by="Bhakaari Bazzar™"
            year={2025}
            className="gradient-text-secondary font-bold text-sm"
          />
          <div className="flex items-center space-x-5">
            <FooterIcon href="#" icon={BsFacebook} className="text-white hover:text-white/75 transition-colors" />
            <FooterIcon href="#" icon={BsInstagram} className="text-white hover:text-white/75 transition-colors" />
            <FooterIcon href="#" icon={BsTwitter} className="text-white hover:text-white/75 transition-colors" />
            <FooterIcon href="#" icon={BsGithub} className="text-white hover:text-white/75 transition-colors" />
            <FooterIcon href="#" icon={BsDribbble} className="text-white hover:text-white/75 transition-colors" />
          </div>
        </div>
      </div>
    </Footer>
  );
}