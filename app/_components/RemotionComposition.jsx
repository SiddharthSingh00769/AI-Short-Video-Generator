"use client"
import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

function RemotionComposition({ videoData, setDurationInFrame }) {
    const captions = videoData?.captionJson || [];
    const { fps } = useVideoConfig();
    const imageList = videoData?.images || [];
    const frame = useCurrentFrame();

    useEffect(() => {
        if (videoData) {
            getDurationFrame();
        }
    }, [videoData]);

    const getDurationFrame = () => {
        const totalDuration = captions[captions.length - 1]?.end * fps || 0;
        setDurationInFrame(totalDuration);
        return totalDuration;
    };

    const getCurrentCaption = () => {
      const currentTime = frame / 30;
      const currentCaption = captions?.find((item) => currentTime >= item?.start && currentTime <= item?.end);
      return currentCaption?currentCaption?.word:'';
    }

    const tailwindToInlineStyles = (tailwindClasses) => {
      const styles = {};
      const classList = tailwindClasses.split(' ');

      classList.forEach((className) => {
          switch (className) {
              case 'text-yellow-400':
                  styles.color = '#FBBF24'; // Tailwind's yellow-400
                  break;
              case 'text-3xl':
                  styles.fontSize = '1.875rem'; // Tailwind's text-3xl
                  break;
              case 'font-extrabold':
                  styles.fontWeight = 800; // Tailwind's font-extrabold
                  break;
              case 'uppercase':
                  styles.textTransform = 'uppercase'; // Tailwind's uppercase
                  break;
              case 'tracking-wide':
                  styles.letterSpacing = '0.05em'; // Tailwind's tracking-wide
                  break;
              case 'drop-shadow-md':
                  styles.textShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Tailwind's drop-shadow-md
                  break;
              case 'px-3':
                  styles.paddingLeft = '0.75rem'; // Tailwind's px-3
                  styles.paddingRight = '0.75rem';
                  break;
              case 'py-1':
                  styles.paddingTop = '0.25rem'; // Tailwind's py-1
                  styles.paddingBottom = '0.25rem';
                  break;
              case 'rounded-lg':
                  styles.borderRadius = '0.5rem'; // Tailwind's rounded-lg
                  break;
              default:
                  break;
          }
      });

      return styles;
  };

    return (
        <div>
            <AbsoluteFill>
                {imageList.length > 0 && imageList.map((item, index) => {
                    const startTime = (index * getDurationFrame()) / imageList.length;
                    const duration = getDurationFrame();
                    const scale = (index) => interpolate(
                      frame,
                      [startTime, startTime + duration / 2, startTime + duration],
                      index % 2 == 0 ? [1,1.8,1]:[1.8,1,1.8],
                      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
                    )

                    return (
                        <Sequence key={index} from={startTime} durationInFrames={duration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: `scale(${scale(index)})`,
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}
            </AbsoluteFill>

            <AbsoluteFill
            style={{
              justifyContent: 'center',
              bottom: 200,
              height: 100,
              fontSize: 78,
              color: 'yellow',
              fontWeight: 'bold',
              top: undefined,
              textAlign: 'center',
            }}
            >
              <h1>{getCurrentCaption()}</h1>
            </AbsoluteFill>
            {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
        </div>
    );
}

export default RemotionComposition;