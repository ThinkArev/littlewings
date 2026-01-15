
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GalleryProps {
  limit?: number; // Optional prop to limit number of items shown
}

interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

const Gallery = ({ limit }: GalleryProps) => {
  const [selectedGallery, setSelectedGallery] = useState<null | number>(null);
  const [galleryMedia, setGalleryMedia] = useState<Record<string, string>>({});

  // Load all gallery media files using Vite's glob import
  useEffect(() => {
    const loadMedia = async () => {
      const modules = import.meta.glob('/src/assets/gallery/*', { eager: true, as: 'url' });
      setGalleryMedia(modules as Record<string, string>);
    };
    loadMedia();
  }, []);

  const galleryItems = [
    {
      title: "Festival Celebrations",
      description: "Janmashtami and traditional festival celebrations",
      image: "�",
      color: "from-coral to-peach",
      media: [
        { src: galleryMedia['/src/assets/gallery/5f54e21d-d838-4fc3-bb4d-cb7c269507cd.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/IMG_9872.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/IMG_8286.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/IMG_5120.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Image 2025-07-11 at 20.10.51 (1).jpeg'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.47.mp4'] || '', type: 'video' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.48.mp4'] || '', type: 'video' as const }
      ]
    },
    {
      title: "Craft & Learning Activities",
      description: "Creative hands-on learning experiences",
      image: "🎨",
      color: "from-mint-green to-soft-purple",
      media: [
        { src: galleryMedia['/src/assets/gallery/WhatsApp Image 2025-07-11 at 20.10.49 (1).jpeg'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Image 2025-07-11 at 20.10.49.jpeg'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/IMG_5117.MOV'] || '', type: 'video' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.49.mp4'] || '', type: 'video' as const }
      ]
    },
    {
      title: "Color Day Celebrations",
      description: "Fun-filled themed color days",
      image: "🌈",
      color: "from-peach to-sunshine-yellow",
      media: [
        { src: galleryMedia['/src/assets/gallery/WhatsApp Image 2025-07-11 at 20.10.50.jpeg'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/1000042586.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.50.mp4'] || '', type: 'video' as const }
      ]
    },
    {
      title: "Birthday Celebrations",
      description: "Special moments and sweet treats",
      image: "🎂",
      color: "from-baby-blue to-mint-green",
      media: [
        { src: galleryMedia['/src/assets/gallery/1000015581.JPG'] || '', type: 'image' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.51.mp4'] || '', type: 'video' as const },
        { src: galleryMedia['/src/assets/gallery/WhatsApp Video 2025-07-11 at 20.10.52.mp4'] || '', type: 'video' as const }
      ]
    },
    {
      title: "School Activities",
      description: "Daily learning and play moments",
      image: "📚",
      color: "from-sunshine-yellow to-coral",
      media: [
        { src: galleryMedia['/src/assets/gallery/e52fb867-9f6a-484a-b2d4-306ffe402d31.JPG'] || '', type: 'image' as const }
      ]
    }
  ];

  const openGallery = (index: number) => {
    setSelectedGallery(index);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-gradient-to-br from-white to-sunshine-yellow/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Our <span className="bg-gradient-to-r from-sunshine-yellow to-coral bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Glimpses of joy, learning, and precious moments at Little Wings Play School
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-8">
          {/* Mobile: Horizontal Scroll - Only on homepage with limit */}
          {limit && (
            <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {galleryItems.slice(0, limit).map((item, index) => (
                <Card 
                  key={index} 
                  className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden cursor-pointer flex-shrink-0 w-[85vw] snap-center"
                  onClick={() => openGallery(index)}
                >
                  <div className="relative">
                    <div className="h-64 overflow-hidden">
                      {item.media[0]?.type === 'image' ? (
                        <img 
                          src={item.media[0].src} 
                          alt={item.title}
                          className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <video 
                          src={item.media[0]?.src} 
                          className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-110"
                          muted
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  <div className="p-4 md:p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </Card>
              ))}
              
              {/* View More Button as last item in scroll */}
              {limit < galleryItems.length && (
                <Link to="/gallery" className="flex-shrink-0 w-[85vw] snap-center">
                  <Card className="bg-gradient-to-br from-sunshine-yellow/20 to-coral/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden cursor-pointer h-full">
                    <div className="h-full flex flex-col items-center justify-center p-8 min-h-[400px]">
                      <div className="w-20 h-20 bg-gradient-to-r from-sunshine-yellow to-coral rounded-full flex items-center justify-center mb-6">
                        <ArrowRight className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">View More Gallery</h3>
                      <p className="text-gray-600 text-center mb-6">Explore all our wonderful moments</p>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-sunshine-yellow to-coral text-white hover:from-coral hover:to-sunshine-yellow"
                      >
                        See All Photos
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          )}

          {/* Mobile Grid (when no limit) OR Desktop Grid */}
          <div className={limit ? "hidden md:contents" : "contents"}>
            {(limit ? galleryItems.slice(0, limit) : galleryItems).map((item, index) => (
              <Card 
                key={index} 
                className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    {item.media[0]?.type === 'image' ? (
                      <img 
                        src={item.media[0].src} 
                        alt={item.title}
                        className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <video 
                        src={item.media[0]?.src} 
                        className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-110"
                        muted
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
                <div className="p-4 md:p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* View More Button - Only show on desktop when limit is applied */}
        {limit && limit < galleryItems.length && (
          <div className="mt-12 text-center hidden md:block">
            <Link to="/gallery">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-sunshine-yellow to-coral text-white hover:from-coral hover:to-sunshine-yellow text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View More Gallery
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Photo Gallery Note - Hidden on mobile */}
        <div className="mt-16 text-center hidden md:block">
          <div className="bg-gradient-to-r from-baby-blue/20 to-mint-green/20 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              See More Photos & Videos
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Visit our school to see our beautiful classrooms, well-equipped play areas, and happy children in action. 
              We'd love to show you around and share more memories of our little wings in flight!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                <span>📸</span>
                <span>High-quality classroom photos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                <span>🎥</span>
                <span>Activity videos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                <span>🏆</span>
                <span>Achievement moments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedGallery !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">
                {galleryItems[selectedGallery].title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeGallery}
                className="rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="p-6">
              <Carousel 
                className="w-full max-w-3xl mx-auto"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {galleryItems[selectedGallery].media.map((item, idx) => (
                    <CarouselItem key={idx}>
                      <div className="p-1">
                        {item.type === 'image' ? (
                          <img
                            src={item.src}
                            alt={`${galleryItems[selectedGallery].title} ${idx + 1}`}
                            className="w-full h-96 object-contain bg-gray-100 rounded-lg"
                          />
                        ) : (
                          <div className="relative">
                            <video
                              src={item.src}
                              controls
                              className="w-full h-96 object-contain rounded-lg bg-black"
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              
              <p className="text-center text-gray-600 mt-4">
                {galleryItems[selectedGallery].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
