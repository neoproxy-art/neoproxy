(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,707199,e=>{"use strict";var o=e.i(47662);let i="pbrBRDFFunctions",t=`#define FRESNEL_MAXIMUM_ON_ROUGH 0.25
#define BRDF_DIFFUSE_MODEL_EON 0
#define BRDF_DIFFUSE_MODEL_BURLEY 1
#define BRDF_DIFFUSE_MODEL_LAMBERT 2
#define BRDF_DIFFUSE_MODEL_LEGACY 3
#define DIELECTRIC_SPECULAR_MODEL_GLTF 0
#define DIELECTRIC_SPECULAR_MODEL_OPENPBR 1
#define CONDUCTOR_SPECULAR_MODEL_GLTF 0
#define CONDUCTOR_SPECULAR_MODEL_OPENPBR 1
#if !defined(PBR_VERTEX_SHADER) && !defined(OPENPBR_VERTEX_SHADER)
#ifdef MS_BRDF_ENERGY_CONSERVATION
vec3 getEnergyConservationFactor(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {return 1.0+specularEnvironmentR0*(1.0/environmentBrdf.y-1.0);}
#endif
#if CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR 
vec3 getF82Specular(float NdotV,vec3 F0,vec3 edgeTint,float roughness) {const float cos_theta_max=0.142857143; 
const float one_minus_cos_theta_max_to_the_fifth=0.462664366; 
const float one_minus_cos_theta_max_to_the_sixth=0.396569457; 
vec3 white_minus_F0=vec3(1.0)-F0;vec3 b_numerator=(F0+white_minus_F0*one_minus_cos_theta_max_to_the_fifth)*(vec3(1.0)-edgeTint);const float b_denominator=cos_theta_max*one_minus_cos_theta_max_to_the_sixth;const float b_denominator_reciprocal=1.0/b_denominator;vec3 b=b_numerator*b_denominator_reciprocal; 
float cos_theta=max(roughness,NdotV);float one_minus_cos_theta=1.0-cos_theta;vec3 offset_from_F0=(white_minus_F0-b*cos_theta*one_minus_cos_theta)*pow(one_minus_cos_theta,5.0);return clamp(F0+offset_from_F0,0.0,1.0);}
#endif
#ifdef FUZZENVIRONMENTBRDF
vec3 getFuzzBRDFLookup(float NdotV,float perceptualRoughness) {vec2 UV=vec2(perceptualRoughness,NdotV);vec4 brdfLookup=texture2D(environmentFuzzBrdfSampler,UV);const vec2 RiRange=vec2(0.0,0.75);const vec2 ARange =vec2(0.005,0.88);const vec2 BRange =vec2(-0.18,0.002);brdfLookup.r=mix(ARange.x, ARange.y, brdfLookup.r);brdfLookup.g=mix(BRange.x, BRange.y, brdfLookup.g);brdfLookup.b=mix(RiRange.x,RiRange.y,brdfLookup.b);return brdfLookup.rgb;}
#endif
#ifdef ENVIRONMENTBRDF
vec3 getBRDFLookup(float NdotV,float perceptualRoughness) {vec2 UV=vec2(NdotV,perceptualRoughness);vec4 brdfLookup=texture2D(environmentBrdfSampler,UV);
#ifdef ENVIRONMENTBRDF_RGBD
brdfLookup.rgb=fromRGBD(brdfLookup.rgba);
#endif
return brdfLookup.rgb;}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 specularEnvironmentR90,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=(specularEnvironmentR90-specularEnvironmentR0)*environmentBrdf.x+specularEnvironmentR0*environmentBrdf.y;
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+specularEnvironmentR90*environmentBrdf.y;
#endif
return reflectance;}
vec3 getReflectanceFromBRDFLookup(const vec3 specularEnvironmentR0,const vec3 environmentBrdf) {
#ifdef BRDF_V_HEIGHT_CORRELATED
vec3 reflectance=mix(environmentBrdf.xxx,environmentBrdf.yyy,specularEnvironmentR0);
#else
vec3 reflectance=specularEnvironmentR0*environmentBrdf.x+environmentBrdf.y;
#endif
return reflectance;}
#endif
/* NOT USED
#if defined(SHEEN) && defined(SHEEN_SOFTER)
float getBRDFLookupCharlieSheen(float NdotV,float perceptualRoughness)
{float c=1.0-NdotV;float c3=c*c*c;return 0.65584461*c3+1.0/(4.16526551+exp(-7.97291361*perceptualRoughness+6.33516894));}
#endif
*/
#if !defined(ENVIRONMENTBRDF) || defined(REFLECTIONMAP_SKYBOX) || defined(ALPHAFRESNEL)
vec3 getReflectanceFromAnalyticalBRDFLookup_Jones(float VdotN,vec3 reflectance0,vec3 reflectance90,float smoothness)
{float weight=mix(FRESNEL_MAXIMUM_ON_ROUGH,1.0,smoothness);return reflectance0+weight*(reflectance90-reflectance0)*pow5(saturate(1.0-VdotN));}
#endif
#if defined(SHEEN) && defined(ENVIRONMENTBRDF)
/**
* The sheen BRDF not containing F can be easily stored in the blue channel of the BRDF texture.
* The blue channel contains DCharlie*VAshikhmin*NdotL as a lokkup table
*/
vec3 getSheenReflectanceFromBRDFLookup(const vec3 reflectance0,const vec3 environmentBrdf) {vec3 sheenEnvironmentReflectance=reflectance0*environmentBrdf.b;return sheenEnvironmentReflectance;}
#endif
vec3 fresnelSchlickGGX(float VdotH,vec3 reflectance0,vec3 reflectance90)
{return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);}
float fresnelSchlickGGX(float VdotH,float reflectance0,float reflectance90)
{return reflectance0+(reflectance90-reflectance0)*pow5(1.0-VdotH);}
#ifdef CLEARCOAT
vec3 getR0RemappedForClearCoat(vec3 f0) {
#ifdef CLEARCOAT_DEFAULTIOR
#ifdef MOBILE
return saturate(f0*(f0*0.526868+0.529324)-0.0482256);
#else
return saturate(f0*(f0*(0.941892-0.263008*f0)+0.346479)-0.0285998);
#endif
#else
vec3 s=sqrt(f0);vec3 t=(vClearCoatRefractionParams.z+vClearCoatRefractionParams.w*s)/(vClearCoatRefractionParams.w+vClearCoatRefractionParams.z*s);return square(t);
#endif
}
#endif
#ifdef IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(
3.2404542,-0.9692660, 0.0556434,
-1.5371385, 1.8760108,-0.2040259,
-0.4985314, 0.0415560, 1.0572252
);vec3 getIORTfromAirToSurfaceR0(vec3 f0) {vec3 sqrtF0=sqrt(f0);return (1.+sqrtF0)/(1.-sqrtF0);}
vec3 getR0fromIORs(vec3 iorT,float iorI) {return square((iorT-vec3(iorI))/(iorT+vec3(iorI)));}
float getR0fromIORs(float iorT,float iorI) {return square((iorT-iorI)/(iorT+iorI));}
vec3 evalSensitivity(float opd,vec3 shift) {float phase=2.0*PI*opd*1.0e-9;const vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);const vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);const vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-square(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*square(phase));xyz/=1.0685e-7;vec3 srgb=XYZ_TO_REC709*xyz;return srgb;}
vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0) {vec3 I=vec3(1.0);float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=square(outsideIOR/iridescenceIOR)*(1.0-square(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if (cosTheta2Sq<0.0) {return I;}
float cosTheta2=sqrt(cosTheta2Sq);float R0=getR0fromIORs(iridescenceIOR,outsideIOR);float R12=fresnelSchlickGGX(cosTheta1,R0,1.);float R21=R12;float T121=1.0-R12;float phi12=0.0;if (iridescenceIOR<outsideIOR) phi12=PI;float phi21=PI-phi12;vec3 baseIOR=getIORTfromAirToSurfaceR0(clamp(baseF0,0.0,0.9999)); 
vec3 R1=getR0fromIORs(baseIOR,iridescenceIOR);vec3 R23=fresnelSchlickGGX(cosTheta2,R1,vec3(1.));vec3 phi23=vec3(0.0);if (baseIOR[0]<iridescenceIOR) phi23[0]=PI;if (baseIOR[1]<iridescenceIOR) phi23[1]=PI;if (baseIOR[2]<iridescenceIOR) phi23[2]=PI;float opd=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=square(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for (int m=1; m<=2; ++m)
{Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*opd,float(m)*phi);I+=Cm*Sm;}
return max(I,vec3(0.0));}
#endif
float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH,float alphaG)
{float a2=square(alphaG);float d=NdotH*NdotH*(a2-1.0)+1.0;return a2/(PI*d*d);}
#ifdef SHEEN
float normalDistributionFunction_CharlieSheen(float NdotH,float alphaG)
{float invR=1./alphaG;float cos2h=NdotH*NdotH;float sin2h=1.-cos2h;return (2.+invR)*pow(sin2h,invR*.5)/(2.*PI);}
#endif
#ifdef ANISOTROPIC
float normalDistributionFunction_BurleyGGX_Anisotropic(float NdotH,float TdotH,float BdotH,const vec2 alphaTB) {float a2=alphaTB.x*alphaTB.y;vec3 v=vec3(alphaTB.y*TdotH,alphaTB.x *BdotH,a2*NdotH);float v2=dot(v,v);float w2=a2/v2;return a2*w2*w2*RECIPROCAL_PI;}
#endif
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility_GGXCorrelated(float NdotL,float NdotV,float alphaG) {
#ifdef MOBILE
float GGXV=NdotL*(NdotV*(1.0-alphaG)+alphaG);float GGXL=NdotV*(NdotL*(1.0-alphaG)+alphaG);return 0.5/(GGXV+GGXL);
#else
float a2=alphaG*alphaG;float GGXV=NdotL*sqrt(NdotV*(NdotV-a2*NdotV)+a2);float GGXL=NdotV*sqrt(NdotL*(NdotL-a2*NdotL)+a2);return 0.5/(GGXV+GGXL);
#endif
}
#else
float smithVisibilityG1_TrowbridgeReitzGGXFast(float dot,float alphaG)
{
#ifdef MOBILE
return 1.0/(dot+alphaG+(1.0-alphaG)*dot ));
#else
float alphaSquared=alphaG*alphaG;return 1.0/(dot+sqrt(alphaSquared+(1.0-alphaSquared)*dot*dot));
#endif
}
float smithVisibility_TrowbridgeReitzGGXFast(float NdotL,float NdotV,float alphaG)
{float visibility=smithVisibilityG1_TrowbridgeReitzGGXFast(NdotL,alphaG)*smithVisibilityG1_TrowbridgeReitzGGXFast(NdotV,alphaG);return visibility;}
#endif
#ifdef ANISOTROPIC
float smithVisibility_GGXCorrelated_Anisotropic(float NdotL,float NdotV,float TdotV,float BdotV,float TdotL,float BdotL,const vec2 alphaTB) {float lambdaV=NdotL*length(vec3(alphaTB.x*TdotV,alphaTB.y*BdotV,NdotV));float lambdaL=NdotV*length(vec3(alphaTB.x*TdotL,alphaTB.y*BdotL,NdotL));float v=0.5/(lambdaV+lambdaL);return v;}
#endif
#ifdef CLEARCOAT
float visibility_Kelemen(float VdotH) {return 0.25/(VdotH*VdotH); }
#endif
#ifdef SHEEN
float visibility_Ashikhmin(float NdotL,float NdotV)
{return 1./(4.*(NdotL+NdotV-NdotL*NdotV));}
/* NOT USED
#ifdef SHEEN_SOFTER
float l(float x,float alphaG)
{float oneMinusAlphaSq=(1.0-alphaG)*(1.0-alphaG);float a=mix(21.5473,25.3245,oneMinusAlphaSq);float b=mix(3.82987,3.32435,oneMinusAlphaSq);float c=mix(0.19823,0.16801,oneMinusAlphaSq);float d=mix(-1.97760,-1.27393,oneMinusAlphaSq);float e=mix(-4.32054,-4.85967,oneMinusAlphaSq);return a/(1.0+b*pow(x,c))+d*x+e;}
float lambdaSheen(float cosTheta,float alphaG)
{return abs(cosTheta)<0.5 ? exp(l(cosTheta,alphaG)) : exp(2.0*l(0.5,alphaG)-l(1.0-cosTheta,alphaG));}
float visibility_CharlieSheen(float NdotL,float NdotV,float alphaG)
{float G=1.0/(1.0+lambdaSheen(NdotV,alphaG)+lambdaSheen(NdotL,alphaG));return G/(4.0*NdotV*NdotL);}
#endif
*/
#endif
float diffuseBRDF_Burley(float NdotL,float NdotV,float VdotH,float roughness) {float diffuseFresnelNV=pow5(saturateEps(1.0-NdotL));float diffuseFresnelNL=pow5(saturateEps(1.0-NdotV));float diffuseFresnel90=0.5+2.0*VdotH*VdotH*roughness;float fresnel =
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNL) *
(1.0+(diffuseFresnel90-1.0)*diffuseFresnelNV);return fresnel/PI;}
const float constant1_FON=0.5-2.0/(3.0*PI);const float constant2_FON=2.0/3.0-28.0/(15.0*PI);float E_FON_approx(float mu,float roughness)
{float sigma=roughness; 
float mucomp=1.0-mu;float mucomp2=mucomp*mucomp;const mat2 Gcoeffs=mat2(0.0571085289,-0.332181442,
0.491881867,0.0714429953);float GoverPi=dot(Gcoeffs*vec2(mucomp,mucomp2),vec2(1.0,mucomp2));return (1.0+sigma*GoverPi)/(1.0+constant1_FON*sigma);}
vec3 diffuseBRDF_EON(vec3 albedo,float roughness,float NdotL,float NdotV,float LdotV)
{vec3 rho=albedo;float sigma=roughness; 
float mu_i=NdotL; 
float mu_o=NdotV; 
float s=LdotV-mu_i*mu_o; 
float sovertF=s>0.0 ? s/max(mu_i,mu_o) : s; 
float AF=1.0/(1.0+constant1_FON*sigma); 
vec3 f_ss=(rho*RECIPROCAL_PI)*AF*(1.0+sigma*sovertF); 
float EFo=E_FON_approx(mu_o,sigma); 
float EFi=E_FON_approx(mu_i,sigma); 
float avgEF=AF*(1.0+constant2_FON*sigma); 
vec3 rho_ms=(rho*rho)*avgEF/(vec3(1.0)-rho*(1.0-avgEF));const float eps=1.0e-7;vec3 f_ms=(rho_ms*RECIPROCAL_PI)*max(eps,1.0-EFo) 
* max(eps,1.0-EFi)
/ max(eps,1.0-avgEF);return (f_ss+f_ms);}
#ifdef SS_TRANSLUCENCY
vec3 transmittanceBRDF_Burley(const vec3 tintColor,const vec3 diffusionDistance,float thickness) {vec3 S=1./maxEps(diffusionDistance);vec3 temp=exp((-0.333333333*thickness)*S);return tintColor.rgb*0.25*(temp*temp*temp+3.0*temp);}
float computeWrappedDiffuseNdotL(float NdotL,float w) {float t=1.0+w;float invt2=1.0/square(t);return saturate((NdotL+w)*invt2);}
#endif
#endif 
`;o.ShaderStore.IncludesShadersStore[i]||(o.ShaderStore.IncludesShadersStore[i]=t),e.s([])},928993,833879,e=>{"use strict";var o=e.i(47662);let i="importanceSampling",t=`vec3 hemisphereCosSample(vec2 u) {float phi=2.*PI*u.x;float cosTheta2=1.-u.y;float cosTheta=sqrt(cosTheta2);float sinTheta=sqrt(1.-cosTheta2);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
vec3 hemisphereImportanceSampleDggx(vec2 u,float a) {float phi=2.*PI*u.x;float cosTheta2=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));float cosTheta=sqrt(cosTheta2);float sinTheta=sqrt(1.-cosTheta2);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
vec3 hemisphereImportanceSampleDggxAnisotropic(vec2 Xi,float alphaTangent,float alphaBitangent)
{alphaTangent=max(alphaTangent,0.0001);alphaBitangent=max(alphaBitangent,0.0001);float phi=atan(alphaBitangent/alphaTangent*tan(2.0*3.14159265*Xi.x));if (Xi.x>0.5) phi+=3.14159265; 
float cosPhi=cos(phi);float sinPhi=sin(phi);float alpha2=(cosPhi*cosPhi)/(alphaTangent*alphaTangent) +
(sinPhi*sinPhi)/(alphaBitangent*alphaBitangent);float tanTheta2=Xi.y/(1.0-Xi.y)/alpha2;float cosTheta=1.0/sqrt(1.0+tanTheta2);float sinTheta=sqrt(max(0.0,1.0-cosTheta*cosTheta));return vec3(sinTheta*cosPhi,sinTheta*sinPhi,cosTheta);}
vec3 hemisphereImportanceSampleDCharlie(vec2 u,float a) { 
float phi=2.*PI*u.x;float sinTheta=pow(u.y,a/(2.*a+1.));float cosTheta=sqrt(1.-sinTheta*sinTheta);return vec3(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}`;o.ShaderStore.IncludesShadersStore[i]||(o.ShaderStore.IncludesShadersStore[i]=t),e.s([],928993);let n="hdrFilteringFunctions",a=`#if NUM_SAMPLES
#if NUM_SAMPLES>0
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
float radicalInverse_VdC(uint bits) 
{bits=(bits<<16u) | (bits>>16u);bits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);bits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);bits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);bits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);return float(bits)*2.3283064365386963e-10; }
vec2 hammersley(uint i,uint N)
{return vec2(float(i)/float(N),radicalInverse_VdC(i));}
#else
float vanDerCorpus(int n,int base)
{float invBase=1.0/float(base);float denom =1.0;float result =0.0;for(int i=0; i<32; ++i)
{if(n>0)
{denom =mod(float(n),2.0);result+=denom*invBase;invBase=invBase/2.0;n =int(float(n)/2.0);}}
return result;}
vec2 hammersley(int i,int N)
{return vec2(float(i)/float(N),vanDerCorpus(i,2));}
#endif
float log4(float x) {return log2(x)/2.;}
vec3 uv_to_normal(vec2 uv) {vec3 N;vec2 uvRange=uv;float theta=uvRange.x*2.*PI;float phi=uvRange.y*PI;float sinPhi=sin(phi);N.x=cos(theta)*sinPhi;N.z=sin(theta)*sinPhi;N.y=cos(phi);return N;}
const float NUM_SAMPLES_FLOAT=float(NUM_SAMPLES);const float NUM_SAMPLES_FLOAT_INVERSED=1./NUM_SAMPLES_FLOAT;const float K=4.;
#define inline
vec3 irradiance(
#ifdef CUSTOM_IRRADIANCE_FILTERING_INPUT
CUSTOM_IRRADIANCE_FILTERING_INPUT
#else
samplerCube inputTexture,
#endif
vec3 inputN,vec2 filteringInfo,
float diffuseRoughness,
vec3 surfaceAlbedo,
vec3 inputV
#if IBL_CDF_FILTERING
,sampler2D icdfSampler
#endif
)
{vec3 n=normalize(inputN);vec3 result=vec3(0.);
#ifndef IBL_CDF_FILTERING
vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);tangent=normalize(cross(tangent,n));vec3 bitangent=cross(n,tangent);mat3 tbn=mat3(tangent,bitangent,n);mat3 tbnInverse=mat3(tangent.x,bitangent.x,n.x,tangent.y,bitangent.y,n.y,tangent.z,bitangent.z,n.z);
#endif
float maxLevel=filteringInfo.y;float dim0=filteringInfo.x;float omegaP=(4.*PI)/(6.*dim0*dim0);vec3 clampedAlbedo=clamp(surfaceAlbedo,vec3(0.1),vec3(1.0));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{vec2 Xi=hammersley(i,NUM_SAMPLES);
#if IBL_CDF_FILTERING
vec2 T;T.x=texture2D(icdfSampler,vec2(Xi.x,0.)).x;T.y=texture2D(icdfSampler,vec2(T.x,Xi.y)).y;vec3 Ls=uv_to_normal(vec2(1.0-fract(T.x+0.25),T.y));float NoL=dot(n,Ls);float NoV=dot(n,inputV);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
float LoV=dot (Ls,inputV);
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
vec3 H=(inputV+Ls)*0.5;float VoH=dot(inputV,H);
#endif
#else
vec3 Ls=hemisphereCosSample(Xi);Ls=normalize(Ls);float NoL=Ls.z; 
vec3 V=tbnInverse*inputV;float NoV=V.z; 
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
float LoV=dot (Ls,V);
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
vec3 H=(V+Ls)*0.5;float VoH=dot(V,H);
#endif
#endif
if (NoL>0.) {
#if IBL_CDF_FILTERING
float pdf=texture2D(icdfSampler,T).z;vec3 c=textureCubeLodEXT(inputTexture,Ls,0.).rgb;
#else
float pdf_inversed=PI/NoL;float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;float l=log4(omegaS)-log4(omegaP)+log4(K);float mipLevel=clamp(l,0.,maxLevel);
#ifdef CUSTOM_IRRADIANCE_FILTERING_FUNCTION
CUSTOM_IRRADIANCE_FILTERING_FUNCTION
#else
vec3 c=textureCubeLodEXT(inputTexture,tbn*Ls,mipLevel).rgb;
#endif
#endif
#if GAMMA_INPUT
c=toLinearSpace(c);
#endif
vec3 diffuseRoughnessTerm=vec3(1.0);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
diffuseRoughnessTerm=diffuseBRDF_EON(clampedAlbedo,diffuseRoughness,NoL,NoV,LoV)*PI;
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseRoughnessTerm=vec3(diffuseBRDF_Burley(NoL,NoV,VoH,diffuseRoughness)*PI);
#endif
#if IBL_CDF_FILTERING
vec3 light=pdf<1e-6 ? vec3(0.0) : vec3(1.0)/vec3(pdf)*c;result+=NoL*diffuseRoughnessTerm*light;
#else
result+=c*diffuseRoughnessTerm;
#endif
}}
result=result*NUM_SAMPLES_FLOAT_INVERSED;
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
result=result/clampedAlbedo;
#endif
return result;}
#define inline
vec3 radiance(float alphaG,samplerCube inputTexture,vec3 inputN,vec2 filteringInfo)
{vec3 n=normalize(inputN);vec3 c=textureCube(inputTexture,n).rgb; 
if (alphaG==0.) {
#if GAMMA_INPUT
c=toLinearSpace(c);
#endif
return c;} else {vec3 result=vec3(0.);vec3 tangent=abs(n.z)<0.999 ? vec3(0.,0.,1.) : vec3(1.,0.,0.);tangent=normalize(cross(tangent,n));vec3 bitangent=cross(n,tangent);mat3 tbn=mat3(tangent,bitangent,n);float maxLevel=filteringInfo.y;float dim0=filteringInfo.x;float omegaP=(4.*PI)/(6.*dim0*dim0);float weight=0.;
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{vec2 Xi=hammersley(i,NUM_SAMPLES);vec3 H=hemisphereImportanceSampleDggx(Xi,alphaG);float NoV=1.;float NoH=H.z;float NoH2=H.z*H.z;float NoL=2.*NoH2-1.;vec3 L=vec3(2.*NoH*H.x,2.*NoH*H.y,NoL);L=normalize(L);if (NoL>0.) {float pdf_inversed=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;float l=log4(omegaS)-log4(omegaP)+log4(K);float mipLevel=clamp(float(l),0.0,maxLevel);weight+=NoL;vec3 c=textureCubeLodEXT(inputTexture,tbn*L,mipLevel).rgb;
#if GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c*NoL;}}
result=result/weight;return result;}}
#ifdef ANISOTROPIC
#define inline
vec3 radianceAnisotropic(
float alphaTangent, 
float alphaBitangent, 
samplerCube inputTexture,
vec3 inputView, 
vec3 inputTangent, 
vec3 inputBitangent, 
vec3 inputNormal, 
vec2 filteringInfo,
vec2 noiseInput, 
bool isRefraction,
float ior 
)
{vec3 V=inputView;vec3 N=inputNormal;vec3 T=inputTangent;vec3 B=inputBitangent;vec3 result=vec3(0.);float maxLevel=filteringInfo.y;float dim0=filteringInfo.x;float clampedAlphaT=max(alphaTangent,MINIMUMVARIANCE);float clampedAlphaB=max(alphaBitangent,MINIMUMVARIANCE);float effectiveDim=dim0*sqrt(clampedAlphaT*clampedAlphaB);float omegaP=(4.*PI)/(6.*effectiveDim*effectiveDim);const float noiseScale=clamp(log2(float(NUM_SAMPLES))/12.0f,0.0f,1.0f);float weight=0.;
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
for(uint i=0u; i<NUM_SAMPLES; ++i)
#else
for(int i=0; i<NUM_SAMPLES; ++i)
#endif
{vec2 Xi=hammersley(i,NUM_SAMPLES);Xi=fract(Xi+noiseInput*mix(0.5f,0.015f,noiseScale)); 
vec3 H_tangent=hemisphereImportanceSampleDggxAnisotropic(Xi,clampedAlphaT,clampedAlphaB);vec3 H=normalize(H_tangent.x*T+H_tangent.y*B+H_tangent.z*N);vec3 L;if (isRefraction) {L=refract(-V,H,1.0/ior);} else {L=reflect(-V,H);}
float NoH=max(dot(N,H),0.001);float VoH=max(dot(V,H),0.001);float NoL=max(dot(N,L),0.001);if (NoL>0.) {float pdf_inversed=4./normalDistributionFunction_BurleyGGX_Anisotropic(
H_tangent.z,H_tangent.x,H_tangent.y,vec2(clampedAlphaT,clampedAlphaB)
);float omegaS=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;float l=log4(omegaS)-log4(omegaP)+log4(K);float mipLevel=clamp(float(l),0.0,maxLevel);weight+=NoL;vec3 c=textureCubeLodEXT(inputTexture,L,mipLevel).rgb;
#if GAMMA_INPUT
c=toLinearSpace(c);
#endif
result+=c*NoL;}}
result=result/weight;return result;}
#endif
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[n]||(o.ShaderStore.IncludesShadersStore[n]=a),e.s([],833879)},170562,927068,601010,249579,395368,478167,999434,325472,586272,728767,460382,e=>{"use strict";var o=e.i(47662);e.i(966058);let i="pbrFragmentExtraDeclaration",t=`varying vec3 vPositionW;
#if DEBUGMODE>0
varying vec4 vClipSpacePosition;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#ifdef NORMAL
varying vec3 vNormalW;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vec3 vEnvironmentIrradiance;
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying float vViewDepth;
#endif
`;o.ShaderStore.IncludesShadersStore[i]||(o.ShaderStore.IncludesShadersStore[i]=t),e.s([],170562);let n="subSurfaceScatteringFunctions",a=`bool testLightingForSSS(float diffusionProfile)
{return diffusionProfile<1.;}`;o.ShaderStore.IncludesShadersStore[n]||(o.ShaderStore.IncludesShadersStore[n]=a),e.s([],927068);let r="pbrHelperFunctions",l=`#define MINIMUMVARIANCE 0.0005
float convertRoughnessToAverageSlope(float roughness)
{return square(roughness)+MINIMUMVARIANCE;}
float fresnelGrazingReflectance(float reflectance0) {float reflectance90=saturate(reflectance0*25.0);return reflectance90;}
vec2 getAARoughnessFactors(vec3 normalVector) {
#ifdef SPECULARAA
vec3 nDfdx=dFdx(normalVector.xyz);vec3 nDfdy=dFdy(normalVector.xyz);float slopeSquare=max(dot(nDfdx,nDfdx),dot(nDfdy,nDfdy));float geometricRoughnessFactor=pow(saturate(slopeSquare),0.333);float geometricAlphaGFactor=sqrt(slopeSquare);geometricAlphaGFactor*=0.75;return vec2(geometricRoughnessFactor,geometricAlphaGFactor);
#else
return vec2(0.);
#endif
}
#ifdef ANISOTROPIC
#ifdef ANISOTROPIC_LEGACY
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {float alphaT=max(alphaG*(1.0+anisotropy),MINIMUMVARIANCE);float alphaB=max(alphaG*(1.0-anisotropy),MINIMUMVARIANCE);return vec2(alphaT,alphaB);}
vec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy,float roughness) {vec3 anisotropicFrameDirection;if (anisotropy>=0.0) {anisotropicFrameDirection=B;} else {anisotropicFrameDirection=T;}
vec3 anisotropicFrameTangent=cross(normalize(anisotropicFrameDirection),V);vec3 anisotropicFrameNormal=cross(anisotropicFrameTangent,anisotropicFrameDirection);vec3 anisotropicNormal=normalize(mix(N,anisotropicFrameNormal,abs(anisotropy)));return anisotropicNormal;}
#elif ANISOTROPIC_OPENPBR
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {float alphaT=max(alphaG*alphaG*sqrt(2.0/(1.0+(1.0-anisotropy)*(1.0-anisotropy))),MINIMUMVARIANCE);float alphaB=max(alphaT*(1.0-anisotropy),MINIMUMVARIANCE);return vec2(alphaT,alphaB);}
#else
vec2 getAnisotropicRoughness(float alphaG,float anisotropy) {float alphaT=max(mix(alphaG,1.0,anisotropy*anisotropy),MINIMUMVARIANCE);float alphaB=max(alphaG,MINIMUMVARIANCE);return vec2(alphaT,alphaB);}
vec3 getAnisotropicBentNormals(const vec3 T,const vec3 B,const vec3 N,const vec3 V,float anisotropy,float roughness) {vec3 bentNormal=cross(B,V);bentNormal=normalize(cross(bentNormal,B));float a=square(square(1.0-anisotropy*(1.0-roughness)));bentNormal=normalize(mix(bentNormal,N,a));return bentNormal;}
#endif
#endif
#if defined(CLEARCOAT) || defined(SS_REFRACTION)
vec3 cocaLambert(vec3 alpha,float distance) {return exp(-alpha*distance);}
vec3 cocaLambert(float NdotVRefract,float NdotLRefract,vec3 alpha,float thickness) {return cocaLambert(alpha,(thickness*((NdotLRefract+NdotVRefract)/(NdotLRefract*NdotVRefract))));}
vec3 computeColorAtDistanceInMedia(vec3 color,float distance) {return -log(color)/distance;}
vec3 computeClearCoatAbsorption(float NdotVRefract,float NdotLRefract,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {vec3 clearCoatAbsorption=mix(vec3(1.0),
cocaLambert(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness),
clearCoatIntensity);return clearCoatAbsorption;}
#endif
#ifdef MICROSURFACEAUTOMATIC
float computeDefaultMicroSurface(float microSurface,vec3 reflectivityColor)
{const float kReflectivityNoAlphaWorkflow_SmoothnessMax=0.95;float reflectivityLuminance=getLuminance(reflectivityColor);float reflectivityLuma=sqrt(reflectivityLuminance);microSurface=reflectivityLuma*kReflectivityNoAlphaWorkflow_SmoothnessMax;return microSurface;}
#endif
`;o.ShaderStore.IncludesShadersStore[r]||(o.ShaderStore.IncludesShadersStore[r]=l),e.s([],601010),e.i(478153);let f="pbrDirectLightingSetupFunctions",s=`struct preLightingInfo
{vec3 lightOffset;float lightDistanceSquared;float lightDistance;float attenuation;vec3 L;vec3 H;float NdotV;float NdotLUnclamped;float NdotL;float VdotH;float LdotV;float roughness;float diffuseRoughness;vec3 surfaceAlbedo;
#ifdef IRIDESCENCE
float iridescenceIntensity;
#endif
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
vec3 areaLightDiffuse;
#ifdef SPECULARTERM
vec3 areaLightSpecular;vec4 areaLightFresnel;
#endif
#endif
};preLightingInfo computePointAndSpotPreLightingInfo(vec4 lightData,vec3 V,vec3 N,vec3 posW) {preLightingInfo result;result.lightOffset=lightData.xyz-posW;result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);result.lightDistance=sqrt(result.lightDistanceSquared);result.L=normalize(result.lightOffset);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));result.NdotLUnclamped=dot(N,result.L);result.NdotL=saturateEps(result.NdotLUnclamped);result.LdotV=0.;result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3(0.);return result;}
preLightingInfo computeDirectionalPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {preLightingInfo result;result.lightDistance=length(-lightData.xyz);result.L=normalize(-lightData.xyz);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));result.NdotLUnclamped=dot(N,result.L);result.NdotL=saturateEps(result.NdotLUnclamped);result.LdotV=dot(result.L,V);result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3(0.);return result;}
preLightingInfo computeHemisphericPreLightingInfo(vec4 lightData,vec3 V,vec3 N) {preLightingInfo result;result.NdotL=dot(N,lightData.xyz)*0.5+0.5;result.NdotL=saturateEps(result.NdotL);result.NdotLUnclamped=result.NdotL;
#ifdef SPECULARTERM
result.L=normalize(lightData.xyz);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));
#endif
result.LdotV=0.;result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3(0.);return result;}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
#include<ltcHelperFunctions>
uniform sampler2D areaLightsLTC1Sampler;uniform sampler2D areaLightsLTC2Sampler;preLightingInfo computeAreaPreLightingInfo(sampler2D ltc1,sampler2D ltc2,vec3 viewDirectionW,vec3 vNormal,vec3 vPosition,vec4 lightData,vec3 halfWidth,vec3 halfHeight,float roughness )
{preLightingInfo result;result.lightOffset=lightData.xyz-vPosition;result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);result.lightDistance=sqrt(result.lightDistanceSquared);areaLightData data=computeAreaLightSpecularDiffuseFresnel(ltc1,ltc2,viewDirectionW,vNormal,vPosition,lightData.xyz,halfWidth,halfHeight,roughness);
#ifdef SPECULARTERM
result.areaLightFresnel=data.Fresnel;result.areaLightSpecular=data.Specular;
#endif
result.areaLightDiffuse=data.Diffuse;result.LdotV=0.;result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3(0.);return result;}
preLightingInfo computeAreaPreLightingInfoWithTexture(sampler2D ltc1,sampler2D ltc2,sampler2D emissionTexture,vec3 viewDirectionW,vec3 vNormal,vec3 vPosition,vec4 lightData,vec3 halfWidth,vec3 halfHeight,float roughness )
{preLightingInfo result;result.lightOffset=lightData.xyz-vPosition;result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);result.lightDistance=sqrt(result.lightDistanceSquared);areaLightData data=computeAreaLightSpecularDiffuseFresnelWithEmission(ltc1,ltc2,emissionTexture,viewDirectionW,vNormal,vPosition,lightData.xyz,halfWidth,halfHeight,roughness);
#ifdef SPECULARTERM
result.areaLightFresnel=data.Fresnel;result.areaLightSpecular=data.Specular;
#endif
result.areaLightDiffuse=data.Diffuse;result.LdotV=0.;result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3(0.);return result;}
#endif
`;o.ShaderStore.IncludesShadersStore[f]||(o.ShaderStore.IncludesShadersStore[f]=s),e.s([],249579);let c="pbrDirectLightingFalloffFunctions",d=`float computeDistanceLightFalloff_Standard(vec3 lightOffset,float range)
{return max(0.,1.0-length(lightOffset)/range);}
float computeDistanceLightFalloff_Physical(float lightDistanceSquared)
{return 1.0/maxEps(lightDistanceSquared);}
float computeDistanceLightFalloff_GLTF(float lightDistanceSquared,float inverseSquaredRange)
{float lightDistanceFalloff=1.0/maxEps(lightDistanceSquared);float factor=lightDistanceSquared*inverseSquaredRange;float attenuation=saturate(1.0-factor*factor);attenuation*=attenuation;lightDistanceFalloff*=attenuation;return lightDistanceFalloff;}
float computeDistanceLightFalloff(vec3 lightOffset,float lightDistanceSquared,float range,float inverseSquaredRange)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDistanceLightFalloff_Physical(lightDistanceSquared);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDistanceLightFalloff_GLTF(lightDistanceSquared,inverseSquaredRange);
#else
return computeDistanceLightFalloff_Standard(lightOffset,range);
#endif
}
float computeDirectionalLightFalloff_Standard(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent)
{float falloff=0.0;float cosAngle=maxEps(dot(-lightDirection,directionToLightCenterW));if (cosAngle>=cosHalfAngle)
{falloff=max(0.,pow(cosAngle,exponent));}
return falloff;}
float computeDirectionalLightFalloff_IES(vec3 lightDirection,vec3 directionToLightCenterW,sampler2D iesLightSampler)
{float cosAngle=dot(-lightDirection,directionToLightCenterW);float angle=acos(cosAngle)/PI;return texture2D(iesLightSampler,vec2(angle,0.)).r;}
float computeDirectionalLightFalloff_Physical(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle)
{const float kMinusLog2ConeAngleIntensityRatio=6.64385618977; 
float concentrationKappa=kMinusLog2ConeAngleIntensityRatio/(1.0-cosHalfAngle);vec4 lightDirectionSpreadSG=vec4(-lightDirection*concentrationKappa,-concentrationKappa);float falloff=exp2(dot(vec4(directionToLightCenterW,1.0),lightDirectionSpreadSG));return falloff;}
float computeDirectionalLightFalloff_GLTF(vec3 lightDirection,vec3 directionToLightCenterW,float lightAngleScale,float lightAngleOffset)
{float cd=dot(-lightDirection,directionToLightCenterW);float falloff=saturate(cd*lightAngleScale+lightAngleOffset);falloff*=falloff;return falloff;}
float computeDirectionalLightFalloff(vec3 lightDirection,vec3 directionToLightCenterW,float cosHalfAngle,float exponent,float lightAngleScale,float lightAngleOffset)
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDirectionalLightFalloff_Physical(lightDirection,directionToLightCenterW,cosHalfAngle);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDirectionalLightFalloff_GLTF(lightDirection,directionToLightCenterW,lightAngleScale,lightAngleOffset);
#else
return computeDirectionalLightFalloff_Standard(lightDirection,directionToLightCenterW,cosHalfAngle,exponent);
#endif
}`;o.ShaderStore.IncludesShadersStore[c]||(o.ShaderStore.IncludesShadersStore[c]=d),e.s([],395368);let u="pbrDirectLightingFunctions",m=`#define CLEARCOATREFLECTANCE90 1.0
struct lightingInfo
{vec3 diffuse;
#ifdef SS_TRANSLUCENCY
vec3 diffuseTransmission;
#endif
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef CLEARCOAT
vec4 clearCoat;
#endif
#ifdef SHEEN
vec3 sheen;
#endif
};float adjustRoughnessFromLightProperties(float roughness,float lightRadius,float lightDistance) {
#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)
float lightRoughness=lightRadius/lightDistance;float totalRoughness=saturate(lightRoughness+roughness);return totalRoughness;
#else
return roughness;
#endif
}
vec3 computeHemisphericDiffuseLighting(preLightingInfo info,vec3 lightColor,vec3 groundColor) {return mix(groundColor,lightColor,info.NdotL);}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
vec3 computeAreaDiffuseLighting(preLightingInfo info,vec3 lightColor) {return info.areaLightDiffuse*lightColor;}
#endif
vec3 computeDiffuseLighting(preLightingInfo info,vec3 lightColor) {vec3 diffuseTerm=vec3(1.0/PI);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_LEGACY
diffuseTerm=vec3(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseTerm=vec3(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.diffuseRoughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
vec3 clampedAlbedo=clamp(info.surfaceAlbedo,vec3(0.1),vec3(1.0));diffuseTerm=diffuseBRDF_EON(clampedAlbedo,info.diffuseRoughness,info.NdotL,info.NdotV,info.LdotV);diffuseTerm/=clampedAlbedo;
#endif
return diffuseTerm*info.attenuation*info.NdotL*lightColor;}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix,vec3 posW){vec4 strq=textureProjectionMatrix*vec4(posW,1.0);strq/=strq.w;vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;return toLinearSpace(textureColor);}
#ifdef SS_TRANSLUCENCY
vec3 computeDiffuseTransmittedLighting(preLightingInfo info,vec3 lightColor,vec3 transmittance) {vec3 transmittanceNdotL=vec3(0.);float NdotL=absEps(info.NdotLUnclamped);
#ifndef SS_TRANSLUCENCY_LEGACY
if (info.NdotLUnclamped<0.0) {
#endif
float wrapNdotL=computeWrappedDiffuseNdotL(NdotL,0.02);float trAdapt=step(0.,info.NdotLUnclamped);transmittanceNdotL=mix(transmittance*wrapNdotL,vec3(wrapNdotL),trAdapt);
#ifndef SS_TRANSLUCENCY_LEGACY
}
vec3 diffuseTerm=vec3(1.0/PI);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_LEGACY
diffuseTerm=vec3(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseTerm=vec3(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.diffuseRoughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
vec3 clampedAlbedo=clamp(info.surfaceAlbedo,vec3(0.1),vec3(1.0));diffuseTerm=diffuseBRDF_EON(clampedAlbedo,info.diffuseRoughness,info.NdotL,info.NdotV,info.LdotV);diffuseTerm/=clampedAlbedo;
#endif
#else
float diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);
#endif
return diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;}
#endif
#ifdef SPECULARTERM
vec3 computeSpecularLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 fresnel,float geometricRoughnessFactor,vec3 lightColor) {float NdotH=saturateEps(dot(N,info.H));float roughness=max(info.roughness,geometricRoughnessFactor);float alphaG=convertRoughnessToAverageSlope(roughness);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);
#ifdef BRDF_V_HEIGHT_CORRELATED
float smithVisibility=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);
#else
float smithVisibility=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);
#endif
vec3 specTerm=fresnel*distribution*smithVisibility;return specTerm*info.attenuation*info.NdotL*lightColor;}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
vec3 computeAreaSpecularLighting(preLightingInfo info,vec3 specularColor,vec3 reflectance0,vec3 reflectance90) {vec3 fresnel=specularColor*info.areaLightFresnel.x*reflectance0+( vec3( 1.0 )-specularColor )*info.areaLightFresnel.y*reflectance90;return specularColor*fresnel*info.areaLightSpecular;}
#endif
#endif
#ifdef FUZZ
float evalFuzz(vec3 L,float NdotL,float NdotV,vec3 T,vec3 B,vec3 ltcLut)
{if (NdotL<=0.0 || NdotV<=0.0)
return 0.0;mat3 M=mat3(
vec3(ltcLut.r,0.0,0.0),
vec3(ltcLut.g,1.0,0.0),
vec3(0.0,0.0,1.0)
);vec3 Llocal=vec3(dot(L,T),dot(L,B),NdotL);vec3 Lwarp=normalize(M*Llocal);float cosThetaWarp=max(Lwarp.z,0.0);return cosThetaWarp*NdotL;}
#endif
#if defined(ANISOTROPIC) && defined(ANISOTROPIC_OPENPBR)
vec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,float geometricRoughnessFactor,vec3 lightColor) {float NdotH=saturateEps(dot(N,info.H));float TdotH=dot(T,info.H);float BdotH=dot(B,info.H);float TdotV=dot(T,V);float BdotV=dot(B,V);float TdotL=dot(T,info.L);float BdotL=dot(B,info.L);float alphaG=convertRoughnessToAverageSlope(info.roughness);vec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);float distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);float smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);vec3 specTerm=vec3(distribution*smithVisibility);return specTerm*info.attenuation*info.NdotL*lightColor;}
#elif defined(ANISOTROPIC)
vec3 computeAnisotropicSpecularLighting(preLightingInfo info,vec3 V,vec3 N,vec3 T,vec3 B,float anisotropy,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {float NdotH=saturateEps(dot(N,info.H));float TdotH=dot(T,info.H);float BdotH=dot(B,info.H);float TdotV=dot(T,V);float BdotV=dot(B,V);float TdotL=dot(T,info.L);float BdotL=dot(B,info.L);float alphaG=convertRoughnessToAverageSlope(info.roughness);vec2 alphaTB=getAnisotropicRoughness(alphaG,anisotropy);alphaTB=max(alphaTB,square(geometricRoughnessFactor));vec3 fresnel=fresnelSchlickGGX(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
float distribution=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);float smithVisibility=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);vec3 specTerm=fresnel*distribution*smithVisibility;return specTerm*info.attenuation*info.NdotL*lightColor;}
#endif
#ifdef CLEARCOAT
vec4 computeClearCoatLighting(preLightingInfo info,vec3 Ncc,float geometricRoughnessFactor,float clearCoatIntensity,vec3 lightColor) {float NccdotL=saturateEps(dot(Ncc,info.L));float NccdotH=saturateEps(dot(Ncc,info.H));float clearCoatRoughness=max(info.roughness,geometricRoughnessFactor);float alphaG=convertRoughnessToAverageSlope(clearCoatRoughness);float fresnel=fresnelSchlickGGX(info.VdotH,vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);fresnel*=clearCoatIntensity;float distribution=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);float kelemenVisibility=visibility_Kelemen(info.VdotH);float clearCoatTerm=fresnel*distribution*kelemenVisibility;return vec4(
clearCoatTerm*info.attenuation*NccdotL*lightColor,
1.0-fresnel
);}
vec3 computeClearCoatLightingAbsorption(float NdotVRefract,vec3 L,vec3 Ncc,vec3 clearCoatColor,float clearCoatThickness,float clearCoatIntensity) {vec3 LRefract=-refract(L,Ncc,vClearCoatRefractionParams.y);float NdotLRefract=saturateEps(dot(Ncc,LRefract));vec3 absorption=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);return absorption;}
#endif
#ifdef SHEEN
vec3 computeSheenLighting(preLightingInfo info,vec3 N,vec3 reflectance0,vec3 reflectance90,float geometricRoughnessFactor,vec3 lightColor) {float NdotH=saturateEps(dot(N,info.H));float roughness=max(info.roughness,geometricRoughnessFactor);float alphaG=convertRoughnessToAverageSlope(roughness);float fresnel=1.;float distribution=normalDistributionFunction_CharlieSheen(NdotH,alphaG);/*#ifdef SHEEN_SOFTER
float visibility=visibility_CharlieSheen(info.NdotL,info.NdotV,alphaG);
#else */
float visibility=visibility_Ashikhmin(info.NdotL,info.NdotV);/* #endif */
float sheenTerm=fresnel*distribution*visibility;return sheenTerm*info.attenuation*info.NdotL*lightColor;}
#endif
`;o.ShaderStore.IncludesShadersStore[u]||(o.ShaderStore.IncludesShadersStore[u]=m),e.s([],478167);let _="pbrIBLFunctions",g=`#if defined(REFLECTION) || defined(SS_REFRACTION)
float getLodFromAlphaG(float cubeMapDimensionPixels,float microsurfaceAverageSlope) {float microsurfaceAverageSlopeTexels=cubeMapDimensionPixels*microsurfaceAverageSlope;float lod=log2(microsurfaceAverageSlopeTexels);return lod;}
float getLinearLodFromRoughness(float cubeMapDimensionPixels,float roughness) {float lod=log2(cubeMapDimensionPixels)*roughness;return lod;}
#endif
#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)
float environmentRadianceOcclusion(float ambientOcclusion,float NdotVUnclamped) {float temp=NdotVUnclamped+ambientOcclusion;return saturate(square(temp)-1.0+ambientOcclusion);}
#endif
#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)
float environmentHorizonOcclusion(vec3 view,vec3 normal,vec3 geometricNormal) {vec3 reflection=reflect(view,normal);float temp=saturate(1.0+1.1*dot(reflection,geometricNormal));return square(temp);}
#endif
#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)
#define UNPACK_LOD(x) (1.0-x)*255.0
float getLodFromAlphaG(float cubeMapDimensionPixels,float alphaG,float NdotV) {float microsurfaceAverageSlope=alphaG;microsurfaceAverageSlope*=sqrt(abs(NdotV));return getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);}
#endif
`;o.ShaderStore.IncludesShadersStore[_]||(o.ShaderStore.IncludesShadersStore[_]=g),e.s([],999434);let E="pbrBlockNormalGeometric",p=`vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#endif
vec3 geometricNormalW=normalW;
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
geometricNormalW=gl_FrontFacing ? geometricNormalW : -geometricNormalW;
#endif
`;o.ShaderStore.IncludesShadersStore[E]||(o.ShaderStore.IncludesShadersStore[E]=p),e.s([],325472);let v="pbrBlockImageProcessing",h=`#if defined(IMAGEPROCESSINGPOSTPROCESS) || defined(SS_SCATTERING)
#if !defined(SKIPFINALCOLORCLAMP)
finalColor.rgb=clamp(finalColor.rgb,0.,30.0);
#endif
#else
finalColor=applyImageProcessing(finalColor);
#endif
finalColor.a*=visibility;
#ifdef PREMULTIPLYALPHA
finalColor.rgb*=finalColor.a;
#endif
`;o.ShaderStore.IncludesShadersStore[v]||(o.ShaderStore.IncludesShadersStore[v]=h),e.s([],586272);let I="pbrBlockPrePass",R=`#if SCENE_MRT_COUNT>0
float writeGeometryInfo=finalColor.a>ALPHATESTVALUE ? 1.0 : 0.0;
#ifdef PREPASS_POSITION
gl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);
#endif
#ifdef PREPASS_LOCAL_POSITION
gl_FragData[PREPASS_LOCAL_POSITION_INDEX]=vec4(vPosition,writeGeometryInfo);
#endif
#if defined(PREPASS_VELOCITY)
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;vec2 velocity=abs(a-b);velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;gl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#elif defined(PREPASS_VELOCITY_LINEAR)
vec2 velocity=vec2(0.5)*((vPreviousPosition.xy/vPreviousPosition.w)-(vCurrentPosition.xy/vCurrentPosition.w));gl_FragData[PREPASS_VELOCITY_LINEAR_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_ALBEDO
gl_FragData[PREPASS_ALBEDO_INDEX]=vec4(surfaceAlbedo,writeGeometryInfo);
#endif
#ifdef PREPASS_ALBEDO_SQRT
vec3 sqAlbedo=sqrt(surfaceAlbedo); 
#endif
#ifdef PREPASS_IRRADIANCE
vec3 irradiance=finalDiffuse;
#ifndef UNLIT
#ifdef REFLECTION
irradiance+=finalIrradiance;
#endif
#endif
#ifdef SS_SCATTERING
#ifdef PREPASS_COLOR
gl_FragData[PREPASS_COLOR_INDEX]=vec4(finalColor.rgb-irradiance,finalColor.a); 
#endif
irradiance/=sqAlbedo;
#else
#ifdef PREPASS_COLOR
gl_FragData[PREPASS_COLOR_INDEX]=finalColor; 
#endif
float scatteringDiffusionProfile=255.;
#endif
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(clamp(irradiance,vec3(0.),vec3(1.)),writeGeometryInfo*scatteringDiffusionProfile/255.); 
#elif defined(PREPASS_COLOR)
gl_FragData[PREPASS_COLOR_INDEX]=vec4(finalColor.rgb,finalColor.a);
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_SCREENSPACE_DEPTH
gl_FragData[PREPASS_SCREENSPACE_DEPTH_INDEX]=vec4(gl_FragCoord.z,0.0,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
gl_FragData[PREPASS_NORMALIZED_VIEW_DEPTH_INDEX]=vec4(vNormViewDepth,0.0,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_NORMAL
#ifdef PREPASS_NORMAL_WORLDSPACE
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalW,writeGeometryInfo);
#else
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalize((view*vec4(normalW,0.0)).rgb),writeGeometryInfo);
#endif
#endif
#ifdef PREPASS_WORLD_NORMAL
gl_FragData[PREPASS_WORLD_NORMAL_INDEX]=vec4(normalW*0.5+0.5,writeGeometryInfo); 
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(sqAlbedo,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#ifndef UNLIT
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(specularEnvironmentR0,microSurface)*writeGeometryInfo;
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4( 0.0,0.0,0.0,1.0 )*writeGeometryInfo;
#endif
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[I]||(o.ShaderStore.IncludesShadersStore[I]=R),e.s([],728767);let S="pbrDebug",N=`#if DEBUGMODE>0
if (vClipSpacePosition.x/vClipSpacePosition.w>=vDebugMode.x) {
#if DEBUGMODE==1
gl_FragColor.rgb=vPositionW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==2 && defined(NORMAL)
gl_FragColor.rgb=vNormalW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==3 && defined(BUMP) || DEBUGMODE==3 && defined(PARALLAX) || DEBUGMODE==3 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==4 && defined(BUMP) || DEBUGMODE==4 && defined(PARALLAX) || DEBUGMODE==4 && defined(ANISOTROPIC)
gl_FragColor.rgb=TBN[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==5
gl_FragColor.rgb=normalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==6 && defined(MAINUV1)
gl_FragColor.rgb=vec3(vMainUV1,0.0);
#elif DEBUGMODE==7 && defined(MAINUV2)
gl_FragColor.rgb=vec3(vMainUV2,0.0);
#elif DEBUGMODE==8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
gl_FragColor.rgb=clearcoatOut.TBNClearCoat[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==10 && defined(CLEARCOAT)
gl_FragColor.rgb=clearcoatOut.clearCoatNormalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==11 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicNormal;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==12 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicTangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==13 && defined(ANISOTROPIC)
gl_FragColor.rgb=anisotropicOut.anisotropicBitangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==20 && defined(ALBEDO)
gl_FragColor.rgb=albedoTexture.rgb;
#ifndef GAMMAALBEDO
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==21 && defined(AMBIENT)
gl_FragColor.rgb=aoOut.ambientOcclusionColorMap.rgb;
#elif DEBUGMODE==22 && defined(OPACITY)
gl_FragColor.rgb=opacityMap.rgb;
#elif DEBUGMODE==23 && defined(EMISSIVE)
gl_FragColor.rgb=emissiveColorTex.rgb;
#ifndef GAMMAEMISSIVE
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==24 && defined(LIGHTMAP)
gl_FragColor.rgb=lightmapColor.rgb;
#ifndef GAMMALIGHTMAP
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceMetallicColorMap.rgb;
#elif DEBUGMODE==26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.surfaceReflectivityColorMap.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatMapData.rg,0.0);
#elif DEBUGMODE==28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
gl_FragColor.rgb=clearcoatOut.clearCoatTintMapData.rgb;
#elif DEBUGMODE==29 && defined(SHEEN) && defined(SHEEN_TEXTURE)
gl_FragColor.rgb=sheenOut.sheenMapData.rgb;
#elif DEBUGMODE==30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)
gl_FragColor.rgb=anisotropicOut.anisotropyMapData.rgb;
#elif DEBUGMODE==31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)
gl_FragColor.rgb=subSurfaceOut.thicknessMap.rgb;
#elif DEBUGMODE==32 && defined(BUMP)
gl_FragColor.rgb=texture2D(bumpSampler,vBumpUV).rgb;
#elif DEBUGMODE==40 && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.environmentRefraction.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==41 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentRadiance.rgb;
#ifndef GAMMAREFLECTION
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==42 && defined(CLEARCOAT) && defined(REFLECTION)
gl_FragColor.rgb=clearcoatOut.environmentClearCoatRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==50
gl_FragColor.rgb=diffuseBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==51 && defined(SPECULARTERM)
gl_FragColor.rgb=specularBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==52 && defined(CLEARCOAT)
gl_FragColor.rgb=clearCoatBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==53 && defined(SHEEN)
gl_FragColor.rgb=sheenBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==54 && defined(REFLECTION)
gl_FragColor.rgb=reflectionOut.environmentIrradiance.rgb;
#ifndef GAMMAREFLECTION
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==60
gl_FragColor.rgb=surfaceAlbedo.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==61
gl_FragColor.rgb=clearcoatOut.specularEnvironmentR0;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==62 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=vec3(reflectivityOut.metallic);
#elif DEBUGMODE==71 && defined(METALLICWORKFLOW)
gl_FragColor.rgb=reflectivityOut.metallicF0;
#elif DEBUGMODE==63
gl_FragColor.rgb=vec3(roughness);
#elif DEBUGMODE==64
gl_FragColor.rgb=vec3(alphaG);
#elif DEBUGMODE==65
gl_FragColor.rgb=vec3(NdotV);
#elif DEBUGMODE==66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
gl_FragColor.rgb=clearcoatOut.clearCoatColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==67 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatRoughness);
#elif DEBUGMODE==68 && defined(CLEARCOAT)
gl_FragColor.rgb=vec3(clearcoatOut.clearCoatNdotV);
#elif DEBUGMODE==69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)
gl_FragColor.rgb=subSurfaceOut.transmittance;
#elif DEBUGMODE==70 && defined(SUBSURFACE) && defined(SS_REFRACTION)
gl_FragColor.rgb=subSurfaceOut.refractionTransmittance;
#elif DEBUGMODE==72
gl_FragColor.rgb=vec3(microSurface);
#elif DEBUGMODE==73
gl_FragColor.rgb=vAlbedoColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==74 && !defined(METALLICWORKFLOW)
gl_FragColor.rgb=vReflectivityColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==75
gl_FragColor.rgb=vEmissiveColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==80 && defined(RADIANCEOCCLUSION)
gl_FragColor.rgb=vec3(seo);
#elif DEBUGMODE==81 && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
gl_FragColor.rgb=vec3(eho);
#elif DEBUGMODE==82 && defined(MS_BRDF_ENERGY_CONSERVATION)
gl_FragColor.rgb=vec3(energyConservationFactor);
#elif DEBUGMODE==83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=baseSpecularEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
gl_FragColor.rgb=clearcoatOut.clearCoatEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==85 && defined(SHEEN) && defined(REFLECTION)
gl_FragColor.rgb=sheenOut.sheenEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==86 && defined(ALPHABLEND)
gl_FragColor.rgb=vec3(luminanceOverAlpha);
#elif DEBUGMODE==87
gl_FragColor.rgb=vec3(alpha);
#elif DEBUGMODE==88 && defined(ALBEDO)
gl_FragColor.rgb=vec3(albedoTexture.a);
#elif DEBUGMODE==89
gl_FragColor.rgb=aoOut.ambientOcclusionColor.rgb;
#else
float stripeWidth=30.;float stripePos=floor(gl_FragCoord.x/stripeWidth);float whichColor=mod(stripePos,2.);vec3 color1=vec3(.6,.2,.2);vec3 color2=vec3(.3,.1,.1);gl_FragColor.rgb=mix(color1,color2,whichColor);
#endif
gl_FragColor.rgb*=vDebugMode.y;
#ifdef DEBUGMODE_NORMALIZE
gl_FragColor.rgb=normalize(gl_FragColor.rgb)*0.5+0.5;
#endif
#ifdef DEBUGMODE_GAMMA
gl_FragColor.rgb=toGammaSpace(gl_FragColor.rgb);
#endif
gl_FragColor.a=1.0;
#ifdef PREPASS
gl_FragData[0]=toLinearSpace(gl_FragColor); 
gl_FragData[1]=vec4(0.,0.,0.,0.); 
#endif
#ifdef DEBUGMODE_FORCERETURN
return;
#endif
}
#endif
`;o.ShaderStore.IncludesShadersStore[S]||(o.ShaderStore.IncludesShadersStore[S]=N),e.s([],460382)},107355,e=>{"use strict";var o=e.i(47662);let i="sceneFragmentDeclaration",t=`uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;uniform mat4 projection;uniform vec4 vEyePosition;
`;o.ShaderStore.IncludesShadersStore[i]||(o.ShaderStore.IncludesShadersStore[i]=t),e.s([])},640333,e=>{"use strict";var o=e.i(47662);e.i(278144),e.i(845107),e.i(107355),e.i(758492);let i="openpbrFragmentDeclaration",t=`uniform float vBaseWeight;uniform vec4 vBaseColor;uniform float vBaseDiffuseRoughness;uniform vec4 vReflectanceInfo;uniform vec4 vSpecularColor;uniform vec3 vSpecularAnisotropy;uniform float vTransmissionWeight;uniform vec3 vTransmissionColor;uniform float vTransmissionDepth;uniform vec3 vTransmissionScatter;uniform float vTransmissionScatterAnisotropy;uniform float vTransmissionDispersionScale;uniform float vTransmissionDispersionAbbeNumber;uniform float vCoatWeight;uniform vec3 vCoatColor;uniform float vCoatRoughness;uniform float vCoatRoughnessAnisotropy;uniform float vCoatIor;uniform float vCoatDarkening;uniform float vFuzzWeight;uniform vec3 vFuzzColor;uniform float vFuzzRoughness;uniform vec2 vGeometryCoatTangent;uniform float vGeometryThickness;uniform vec3 vEmissionColor;uniform float vThinFilmWeight;uniform vec2 vThinFilmThickness;uniform float vThinFilmIor;uniform vec4 vLightingIntensity;uniform float visibility;
#ifdef BASE_COLOR
uniform vec2 vBaseColorInfos;
#endif
#ifdef BASE_WEIGHT
uniform vec2 vBaseWeightInfos;
#endif
#ifdef BASE_METALNESS
uniform vec2 vBaseMetalnessInfos;
#endif
#ifdef BASE_DIFFUSE_ROUGHNESS
uniform vec2 vBaseDiffuseRoughnessInfos;
#endif
#ifdef SPECULAR_WEIGHT
uniform vec2 vSpecularWeightInfos;
#endif
#ifdef SPECULAR_COLOR
uniform vec2 vSpecularColorInfos;
#endif
#ifdef SPECULAR_ROUGHNESS
uniform vec2 vSpecularRoughnessInfos;
#endif
#ifdef SPECULAR_ROUGHNESS_ANISOTROPY
uniform vec2 vSpecularRoughnessAnisotropyInfos;
#endif
#ifdef SPECULAR_IOR
uniform vec2 vSpecularIorInfos;
#endif
#ifdef AMBIENT_OCCLUSION
uniform vec2 vAmbientOcclusionInfos;
#endif
#ifdef GEOMETRY_NORMAL
uniform vec2 vGeometryNormalInfos;uniform vec2 vTangentSpaceParams;
#endif
#ifdef GEOMETRY_TANGENT
uniform vec2 vGeometryTangentInfos;
#endif
#ifdef GEOMETRY_COAT_NORMAL
uniform vec2 vGeometryCoatNormalInfos;
#endif
#ifdef GEOMETRY_OPACITY
uniform vec2 vGeometryOpacityInfos;
#endif
#ifdef GEOMETRY_THICKNESS
uniform vec2 vGeometryThicknessInfos;
#endif
#ifdef EMISSION_COLOR
uniform vec2 vEmissionColorInfos;
#endif
#ifdef TRANSMISSION_WEIGHT
uniform vec2 vTransmissionWeightInfos;
#endif
#ifdef TRANSMISSION_COLOR
uniform vec2 vTransmissionColorInfos;
#endif
#ifdef TRANSMISSION_DEPTH
uniform vec2 vTransmissionDepthInfos;
#endif
#ifdef TRANSMISSION_SCATTER
uniform vec2 vTransmissionScatterInfos;
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
uniform vec2 vTransmissionDispersionScaleInfos;
#endif
#ifdef COAT_WEIGHT
uniform vec2 vCoatWeightInfos;
#endif
#ifdef COAT_COLOR
uniform vec2 vCoatColorInfos;
#endif
#ifdef COAT_ROUGHNESS
uniform vec2 vCoatRoughnessInfos;
#endif
#ifdef COAT_ROUGHNESS_ANISOTROPY
uniform vec2 vCoatRoughnessAnisotropyInfos;
#endif
#ifdef COAT_IOR
uniform vec2 vCoatIorInfos;
#endif
#ifdef COAT_DARKENING
uniform vec2 vCoatDarkeningInfos;
#endif
#ifdef FUZZ_WEIGHT
uniform vec2 vFuzzWeightInfos;
#endif
#ifdef FUZZ_COLOR
uniform vec2 vFuzzColorInfos;
#endif
#ifdef FUZZ_ROUGHNESS
uniform vec2 vFuzzRoughnessInfos;
#endif
#ifdef GEOMETRY_COAT_TANGENT
uniform vec2 vGeometryCoatTangentInfos;
#endif
#ifdef THIN_FILM_WEIGHT
uniform vec2 vThinFilmWeightInfos;
#endif
#ifdef THIN_FILM_THICKNESS
uniform vec2 vThinFilmThicknessInfos;
#endif
#include<sceneFragmentDeclaration>
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#ifdef REALTIME_FILTERING
uniform vec2 vReflectionFilteringInfo;
#endif
uniform mat4 reflectionMatrix;uniform vec3 vReflectionMicrosurfaceInfos;
#if defined(USEIRRADIANCEMAP) && defined(USE_IRRADIANCE_DOMINANT_DIRECTION)
uniform vec3 vReflectionDominantDirection;
#endif
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;uniform vec3 vReflectionSize;
#endif
#endif
#ifdef PREPASS
#ifdef SS_SCATTERING
uniform float scatteringDiffusionProfile;
#endif
#endif
#if DEBUGMODE>0
uniform vec2 vDebugMode;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#include<decalFragmentDeclaration>
#ifdef USESPHERICALFROMREFLECTIONMAP
#ifdef SPHERICAL_HARMONICS
uniform vec3 vSphericalL00;uniform vec3 vSphericalL1_1;uniform vec3 vSphericalL10;uniform vec3 vSphericalL11;uniform vec3 vSphericalL2_2;uniform vec3 vSphericalL2_1;uniform vec3 vSphericalL20;uniform vec3 vSphericalL21;uniform vec3 vSphericalL22;
#else
uniform vec3 vSphericalX;uniform vec3 vSphericalY;uniform vec3 vSphericalZ;uniform vec3 vSphericalXX_ZZ;uniform vec3 vSphericalYY_ZZ;uniform vec3 vSphericalZZ;uniform vec3 vSphericalXY;uniform vec3 vSphericalYZ;uniform vec3 vSphericalZX;
#endif
#endif
#ifdef REFRACTED_BACKGROUND
uniform mat4 backgroundRefractionMatrix;uniform vec3 vBackgroundRefractionInfos;
#endif
#define ADDITIONAL_FRAGMENT_DECLARATION
`;o.ShaderStore.IncludesShadersStore[i]||(o.ShaderStore.IncludesShadersStore[i]=t),e.i(577098),e.i(170562),e.i(482656),e.i(331116),e.i(530550);let n="openpbrFragmentSamplersDeclaration",a=`#include<samplerFragmentDeclaration>(_DEFINENAME_,BASE_COLOR,_VARYINGNAME_,BaseColor,_SAMPLERNAME_,baseColor)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BASE_WEIGHT,_VARYINGNAME_,BaseWeight,_SAMPLERNAME_,baseWeight)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BASE_DIFFUSE_ROUGHNESS,_VARYINGNAME_,BaseDiffuseRoughness,_SAMPLERNAME_,baseDiffuseRoughness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BASE_METALNESS,_VARYINGNAME_,BaseMetalness,_SAMPLERNAME_,baseMetalness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR_WEIGHT,_VARYINGNAME_,SpecularWeight,_SAMPLERNAME_,specularWeight)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR_COLOR,_VARYINGNAME_,SpecularColor,_SAMPLERNAME_,specularColor)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR_ROUGHNESS,_VARYINGNAME_,SpecularRoughness,_SAMPLERNAME_,specularRoughness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR_ROUGHNESS_ANISOTROPY,_VARYINGNAME_,SpecularRoughnessAnisotropy,_SAMPLERNAME_,specularRoughnessAnisotropy)
#include <samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_WEIGHT,_VARYINGNAME_,TransmissionWeight,_SAMPLERNAME_,transmissionWeight)
#include <samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_COLOR,_VARYINGNAME_,TransmissionColor,_SAMPLERNAME_,transmissionColor)
#include <samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_DEPTH,_VARYINGNAME_,TransmissionDepth,_SAMPLERNAME_,transmissionDepth)
#include <samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_SCATTER,_VARYINGNAME_,TransmissionScatter,_SAMPLERNAME_,transmissionScatter)
#include <samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_DISPERSION_SCALE,_VARYINGNAME_,TransmissionDispersionScale,_SAMPLERNAME_,transmissionDispersionScale)
#include<samplerFragmentDeclaration>(_DEFINENAME_,COAT_WEIGHT,_VARYINGNAME_,CoatWeight,_SAMPLERNAME_,coatWeight)
#include<samplerFragmentDeclaration>(_DEFINENAME_,COAT_COLOR,_VARYINGNAME_,CoatColor,_SAMPLERNAME_,coatColor)
#include<samplerFragmentDeclaration>(_DEFINENAME_,COAT_ROUGHNESS,_VARYINGNAME_,CoatRoughness,_SAMPLERNAME_,coatRoughness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,COAT_ROUGHNESS_ANISOTROPY,_VARYINGNAME_,CoatRoughnessAnisotropy,_SAMPLERNAME_,coatRoughnessAnisotropy)
#include<samplerFragmentDeclaration>(_DEFINENAME_,COAT_DARKENING,_VARYINGNAME_,CoatDarkening,_SAMPLERNAME_,coatDarkening)
#include<samplerFragmentDeclaration>(_DEFINENAME_,FUZZ_WEIGHT,_VARYINGNAME_,FuzzWeight,_SAMPLERNAME_,fuzzWeight)
#include<samplerFragmentDeclaration>(_DEFINENAME_,FUZZ_COLOR,_VARYINGNAME_,FuzzColor,_SAMPLERNAME_,fuzzColor)
#include<samplerFragmentDeclaration>(_DEFINENAME_,FUZZ_ROUGHNESS,_VARYINGNAME_,FuzzRoughness,_SAMPLERNAME_,fuzzRoughness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_OPACITY,_VARYINGNAME_,GeometryOpacity,_SAMPLERNAME_,geometryOpacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_TANGENT,_VARYINGNAME_,GeometryTangent,_SAMPLERNAME_,geometryTangent)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_COAT_TANGENT,_VARYINGNAME_,GeometryCoatTangent,_SAMPLERNAME_,geometryCoatTangent)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_THICKNESS,_VARYINGNAME_,GeometryThickness,_SAMPLERNAME_,geometryThickness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSION_COLOR,_VARYINGNAME_,EmissionColor,_SAMPLERNAME_,emissionColor)
#include<samplerFragmentDeclaration>(_DEFINENAME_,THIN_FILM_WEIGHT,_VARYINGNAME_,ThinFilmWeight,_SAMPLERNAME_,thinFilmWeight)
#include<samplerFragmentDeclaration>(_DEFINENAME_,THIN_FILM_THICKNESS,_VARYINGNAME_,ThinFilmThickness,_SAMPLERNAME_,thinFilmThickness)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT_OCCLUSION,_VARYINGNAME_,AmbientOcclusion,_SAMPLERNAME_,ambientOcclusion)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_SAMPLERNAME_,decal)
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
#define sampleReflection(s,c) textureCube(s,c)
uniform samplerCube reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube reflectionSamplerLow;uniform samplerCube reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform samplerCube irradianceSampler;
#endif
#else
#define sampleReflection(s,c) texture2D(s,c)
uniform sampler2D reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D reflectionSamplerLow;uniform sampler2D reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform sampler2D irradianceSampler;
#endif
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#endif
#ifdef ENVIRONMENTBRDF
uniform sampler2D environmentBrdfSampler;
#endif
#ifdef FUZZENVIRONMENTBRDF
uniform sampler2D environmentFuzzBrdfSampler;
#endif
#ifdef REFRACTED_BACKGROUND
uniform sampler2D backgroundRefractionSampler;
#endif
#if defined(ANISOTROPIC) || defined(FUZZ) || defined(REFRACTED_BACKGROUND)
uniform sampler2D blueNoiseSampler;
#endif
#ifdef IBL_CDF_FILTERING
uniform sampler2D icdfSampler;
#endif
`;o.ShaderStore.IncludesShadersStore[n]||(o.ShaderStore.IncludesShadersStore[n]=a),e.i(857325),e.i(981239),e.i(245224),e.i(971154),e.i(87714),e.i(927068),e.i(928993),e.i(601010),e.i(377772),e.i(67654),e.i(230514),e.i(249579),e.i(395368),e.i(707199),e.i(833879),e.i(478167),e.i(999434);let r="openpbrNormalMapFragmentMainFunctions",l=`#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL) || defined(ANISOTROPIC) || defined(FUZZ) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat4 normalMatrix;
#if defined(WEBGL2) || defined(WEBGPU)
mat4 toNormalMatrix(mat4 wMatrix)
{mat4 ret=inverse(wMatrix);ret=transpose(ret);ret[0][3]=0.;ret[1][3]=0.;ret[2][3]=0.;ret[3]=vec4(0.,0.,0.,1.);return ret;}
#else
mat4 toNormalMatrix(mat4 m)
{float
a00=m[0][0],a01=m[0][1],a02=m[0][2],a03=m[0][3],
a10=m[1][0],a11=m[1][1],a12=m[1][2],a13=m[1][3],
a20=m[2][0],a21=m[2][1],a22=m[2][2],a23=m[2][3],
a30=m[3][0],a31=m[3][1],a32=m[3][2],a33=m[3][3],
b00=a00*a11-a01*a10,
b01=a00*a12-a02*a10,
b02=a00*a13-a03*a10,
b03=a01*a12-a02*a11,
b04=a01*a13-a03*a11,
b05=a02*a13-a03*a12,
b06=a20*a31-a21*a30,
b07=a20*a32-a22*a30,
b08=a20*a33-a23*a30,
b09=a21*a32-a22*a31,
b10=a21*a33-a23*a31,
b11=a22*a33-a23*a32,
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;mat4 mi=mat4(
a11*b11-a12*b10+a13*b09,
a02*b10-a01*b11-a03*b09,
a31*b05-a32*b04+a33*b03,
a22*b04-a21*b05-a23*b03,
a12*b08-a10*b11-a13*b07,
a00*b11-a02*b08+a03*b07,
a32*b02-a30*b05-a33*b01,
a20*b05-a22*b02+a23*b01,
a10*b10-a11*b08+a13*b06,
a01*b08-a00*b10-a03*b06,
a30*b04-a31*b02+a33*b00,
a21*b02-a20*b04-a23*b00,
a11*b07-a10*b09-a12*b06,
a00*b09-a01*b07+a02*b06,
a31*b01-a30*b03-a32*b00,
a20*b03-a21*b01+a22*b00)/det;return mat4(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);}
#endif
#endif
vec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)
{
#ifdef NORMALXYSCALE
normal=normalize(normal*vec3(scale,scale,1.0));
#endif
return normalize(cotangentFrame*normal);}
vec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)
{return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);}
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)
{vec3 dp1=dFdx(p);vec3 dp2=dFdy(p);vec2 duv1=dFdx(uv);vec2 duv2=dFdy(uv);vec3 dp2perp=cross(dp2,normal);vec3 dp1perp=cross(normal,dp1);vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;vec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;tangent*=tangentSpaceParams.x;bitangent*=tangentSpaceParams.y;float det=max(dot(tangent,tangent),dot(bitangent,bitangent));float invmax=det==0.0 ? 0.0 : inversesqrt(det);return mat3(tangent*invmax,bitangent*invmax,normal);}
#endif
`;o.ShaderStore.IncludesShadersStore[r]||(o.ShaderStore.IncludesShadersStore[r]=l);let f="openpbrNormalMapFragmentFunctions",s=`#if defined(GEOMETRY_NORMAL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_NORMAL,_VARYINGNAME_,GeometryNormal,_SAMPLERNAME_,geometryNormal)
#endif
#if defined(GEOMETRY_COAT_NORMAL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,GEOMETRY_COAT_NORMAL,_VARYINGNAME_,GeometryCoatNormal,_SAMPLERNAME_,geometryCoatNormal)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(GEOMETRY_NORMAL) && defined(PARALLAX)
const float minSamples=4.;const float maxSamples=15.;const int iMaxSamples=15;vec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {float parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;parallaxLimit*=parallaxScale;vec2 vOffsetDir=normalize(vViewDirCoT.xy);vec2 vMaxOffset=vOffsetDir*parallaxLimit;float numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));float stepSize=1.0/numSamples;float currRayHeight=1.0;vec2 vCurrOffset=vec2(0,0);vec2 vLastOffset=vec2(0,0);float lastSampledHeight=1.0;float currSampledHeight=1.0;bool keepWorking=true;for (int i=0; i<iMaxSamples; i++)
{currSampledHeight=texture2D(geometryNormalSampler,texCoord+vCurrOffset).w;if (!keepWorking)
{}
else if (currSampledHeight>currRayHeight)
{float delta1=currSampledHeight-currRayHeight;float delta2=(currRayHeight+stepSize)-lastSampledHeight;float ratio=delta1/(delta1+delta2);vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;keepWorking=false;}
else
{currRayHeight-=stepSize;vLastOffset=vCurrOffset;
#ifdef PARALLAX_RHS
vCurrOffset-=stepSize*vMaxOffset;
#else
vCurrOffset+=stepSize*vMaxOffset;
#endif
lastSampledHeight=currSampledHeight;}}
return vCurrOffset;}
vec2 parallaxOffset(vec3 viewDir,float heightScale)
{float height=texture2D(geometryNormalSampler,vGeometryNormalUV).w;vec2 texCoordOffset=heightScale*viewDir.xy*height;
#ifdef PARALLAX_RHS
return texCoordOffset;
#else
return -texCoordOffset;
#endif
}
#endif
`;o.ShaderStore.IncludesShadersStore[f]||(o.ShaderStore.IncludesShadersStore[f]=s),e.i(835716);let c="openpbrDielectricReflectance",d=`struct ReflectanceParams
{float F0;float F90;vec3 coloredF0;vec3 coloredF90;};
#define pbr_inline
ReflectanceParams dielectricReflectance(
in float insideIOR,in float outsideIOR,in vec3 specularColor,in float specularWeight
)
{ReflectanceParams outParams;float dielectricF0=pow((insideIOR-outsideIOR)/(insideIOR+outsideIOR),2.0);float dielectricF0_NoSpec=pow((1.0-outsideIOR)/(1.0+outsideIOR),2.0);float f90Scale=clamp(2.0*abs(insideIOR-outsideIOR),0.0,1.0);float f90Scale_NoSpec=clamp(2.0*abs(1.0-outsideIOR),0.0,1.0);
#if (DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_OPENPBR)
vec3 dielectricColorF90=specularColor.rgb*vec3(f90Scale);vec3 dielectricColorF90_NoSpec=specularColor.rgb*vec3(f90Scale_NoSpec);
#else
vec3 dielectricColorF90=vec3(f90Scale);vec3 dielectricColorF90_NoSpec=vec3(f90Scale_NoSpec);
#endif
#if DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_GLTF
float maxF0=max(specularColor.r,max(specularColor.g,specularColor.b));outParams.F0=mix(dielectricF0_NoSpec,dielectricF0,specularWeight)*maxF0;
#else
outParams.F0=mix(dielectricF0_NoSpec,dielectricF0,specularWeight);
#endif
outParams.F90=mix(f90Scale_NoSpec,f90Scale,specularWeight);outParams.coloredF0=mix(vec3(dielectricF0_NoSpec),vec3(dielectricF0),specularWeight)*specularColor.rgb;outParams.coloredF90=mix(dielectricColorF90_NoSpec,dielectricColorF90,specularWeight);return outParams;}
`;o.ShaderStore.IncludesShadersStore[c]||(o.ShaderStore.IncludesShadersStore[c]=d);let u="openpbrConductorReflectance",m=`#define pbr_inline
ReflectanceParams conductorReflectance(in vec3 baseColor,in vec3 specularColor,in float specularWeight)
{ReflectanceParams outParams;
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR)
outParams.coloredF0=baseColor*specularWeight;outParams.coloredF90=specularColor*specularWeight;
#else
outParams.coloredF0=baseColor;outParams.coloredF90=vec3(1.0);
#endif
outParams.F0=1.0;outParams.F90=1.0;return outParams;}`;o.ShaderStore.IncludesShadersStore[u]||(o.ShaderStore.IncludesShadersStore[u]=m);let _="openpbrAmbientOcclusionFunctions",g=`float compute_specular_occlusion(const float n_dot_v,const float metallic,const float ambient_occlusion,const float roughness)
{float specular_occlusion=saturate(pow(n_dot_v+ambient_occlusion,exp2(-16.0*roughness-1.0))-1.0+ambient_occlusion);return mix(specular_occlusion,1.0,metallic*square(1.0-roughness));}
`;o.ShaderStore.IncludesShadersStore[_]||(o.ShaderStore.IncludesShadersStore[_]=g);let E="openpbrGeometryInfo",p=`struct geometryInfoOutParams
{float NdotV;float NdotVUnclamped;vec3 environmentBrdf;float horizonOcclusion;};struct geometryInfoAnisoOutParams
{float NdotV;float NdotVUnclamped;vec3 environmentBrdf;float horizonOcclusion;float anisotropy;vec3 anisotropicTangent;vec3 anisotropicBitangent;mat3 TBN;};
#define pbr_inline
geometryInfoOutParams geometryInfo(
in vec3 normalW,in vec3 viewDirectionW,in float roughness,in vec3 geometricNormalW
)
{geometryInfoOutParams outParams;outParams.NdotVUnclamped=dot(normalW,viewDirectionW);outParams.NdotV=absEps(outParams.NdotVUnclamped);
#if defined(ENVIRONMENTBRDF)
outParams.environmentBrdf=getBRDFLookup(outParams.NdotV,roughness);
#else
outParams.environmentBrdf=vec3(0.0);
#endif
outParams.horizonOcclusion=1.0;
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef HORIZONOCCLUSION
#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL)
#ifdef REFLECTIONMAP_3D
outParams.horizonOcclusion=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif
return outParams;}
#define pbr_inline
geometryInfoAnisoOutParams geometryInfoAniso(
in vec3 normalW,in vec3 viewDirectionW,in float roughness,in vec3 geometricNormalW
,in vec3 vAnisotropy,in mat3 TBN
)
{geometryInfoOutParams geoInfo=geometryInfo(normalW,viewDirectionW,roughness,geometricNormalW);geometryInfoAnisoOutParams outParams;outParams.NdotV=geoInfo.NdotV;outParams.NdotVUnclamped=geoInfo.NdotVUnclamped;outParams.environmentBrdf=geoInfo.environmentBrdf;outParams.horizonOcclusion=geoInfo.horizonOcclusion;outParams.anisotropy=vAnisotropy.b;vec3 anisotropyDirection=vec3(vAnisotropy.xy,0.);mat3 anisoTBN=mat3(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));outParams.anisotropicTangent=normalize(anisoTBN*anisotropyDirection);outParams.anisotropicBitangent=normalize(cross(anisoTBN[2],outParams.anisotropicTangent));outParams.TBN=TBN;return outParams;}`;o.ShaderStore.IncludesShadersStore[E]||(o.ShaderStore.IncludesShadersStore[E]=p);let v="openpbrIblFunctions",h=`#ifdef REFLECTION
vec3 sampleIrradiance(
in vec3 surfaceNormal
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,in vec3 vEnvironmentIrradianceSH
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,in mat4 iblMatrix
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
,in samplerCube irradianceSampler
#else
,in sampler2D irradianceSampler
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,in vec3 reflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,in sampler2D icdfSampler
#endif
#endif
,in vec2 vReflectionInfos
,in vec3 viewDirectionW
,in float diffuseRoughness
,in vec3 surfaceAlbedo
) {vec3 environmentIrradiance=vec3(0.,0.,0.);
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
vec3 irradianceVector=(iblMatrix*vec4(surfaceNormal,0)).xyz;vec3 irradianceView=(iblMatrix*vec4(viewDirectionW,0)).xyz;
#if !defined(USE_IRRADIANCE_DOMINANT_DIRECTION) && !defined(REALTIME_FILTERING)
#if BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LAMBERT && BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LEGACY
{float NdotV=max(dot(surfaceNormal,viewDirectionW),0.0);irradianceVector=mix(irradianceVector,irradianceView,(0.5*(1.0-NdotV))*diffuseRoughness);}
#endif
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;
#endif
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradianceSH;
#else
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo,diffuseRoughness,surfaceAlbedo,irradianceView
#ifdef IBL_CDF_FILTERING
,icdfSampler
#endif
);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
vec4 environmentIrradianceFromTexture=sampleReflection(irradianceSampler,irradianceVector);
#else
vec4 environmentIrradianceFromTexture=sampleReflection(irradianceSampler,reflectionCoords);
#endif
environmentIrradiance=environmentIrradianceFromTexture.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradianceFromTexture);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
vec3 Ls=normalize(reflectionDominantDirection);float NoL=dot(irradianceVector,Ls);float NoV=dot(irradianceVector,irradianceView);vec3 diffuseRoughnessTerm=vec3(1.0);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
float LoV=dot (Ls,irradianceView);float mag=length(reflectionDominantDirection)*2.0;vec3 clampedAlbedo=clamp(surfaceAlbedo,vec3(0.1),vec3(1.0));diffuseRoughnessTerm=diffuseBRDF_EON(clampedAlbedo,diffuseRoughness,NoL,NoV,LoV)*PI;diffuseRoughnessTerm=diffuseRoughnessTerm/clampedAlbedo;diffuseRoughnessTerm=mix(vec3(1.0),diffuseRoughnessTerm,sqrt(clamp(mag*NoV,0.0,1.0)));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
vec3 H=(irradianceView+Ls)*0.5;float VoH=dot(irradianceView,H);diffuseRoughnessTerm=vec3(diffuseBRDF_Burley(NoL,NoV,VoH,diffuseRoughness)*PI);
#endif
environmentIrradiance=environmentIrradiance.rgb*diffuseRoughnessTerm;
#endif
#endif
environmentIrradiance*=vReflectionInfos.x;return environmentIrradiance;}
#define pbr_inline
#ifdef REFLECTIONMAP_3D
vec3 createReflectionCoords(
#else
vec2 createReflectionCoords(
#endif
in vec3 vPositionW
,in vec3 normalW
)
{vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=reflectionVector;
#else
vec2 reflectionCoords=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0-reflectionCoords.y;
#endif
return reflectionCoords;}
#define pbr_inline
#define inline
vec3 sampleRadiance(
in float alphaG
,in vec3 vReflectionMicrosurfaceInfos
,in vec2 vReflectionInfos
,in geometryInfoOutParams geoInfo
#ifdef REFLECTIONMAP_3D
,in samplerCube reflectionSampler
,const vec3 reflectionCoords
#else
,in sampler2D reflectionSampler
,const vec2 reflectionCoords
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#endif
)
{vec4 environmentRadiance=vec4(0.,0.,0.,0.);
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
environmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);
#else
environmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#endif
#ifdef RGBDREFLECTION
environmentRadiance.rgb=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
environmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);
#endif
environmentRadiance.rgb*=vec3(vReflectionInfos.x);return environmentRadiance.rgb;}
#if defined(ANISOTROPIC)
#define pbr_inline
#define inline
vec3 sampleRadianceAnisotropic(
in float alphaG
,in vec3 vReflectionMicrosurfaceInfos
,in vec2 vReflectionInfos
,in geometryInfoAnisoOutParams geoInfo
,const vec3 normalW
,const vec3 viewDirectionW
,const vec3 positionW
,const vec3 noise
,bool isRefraction
,float ior
#ifdef REFLECTIONMAP_3D
,in samplerCube reflectionSampler
#else
,in sampler2D reflectionSampler
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#endif
)
{vec4 environmentRadiance=vec4(0.,0.,0.,0.);float alphaT=alphaG*sqrt(2.0/(1.0+(1.0-geoInfo.anisotropy)*(1.0-geoInfo.anisotropy)));float alphaB=(1.0-geoInfo.anisotropy)*alphaT;alphaG=alphaB;
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
vec3 view=(reflectionMatrix*vec4(viewDirectionW,0.0)).xyz;vec3 tangent=(reflectionMatrix*vec4(geoInfo.anisotropicTangent,0.0)).xyz;vec3 bitangent=(reflectionMatrix*vec4(geoInfo.anisotropicBitangent,0.0)).xyz;vec3 normal=(reflectionMatrix*vec4(normalW,0.0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
view.z*=-1.0;tangent.z*=-1.0;bitangent.z*=-1.0;normal.z*=-1.0;
#endif
environmentRadiance =
vec4(radianceAnisotropic(alphaT,alphaB,reflectionSampler,
view,tangent,
bitangent,normal,
vReflectionFilteringInfo,noise.xy,isRefraction,ior),
1.0);
#else
const int samples=16;vec4 radianceSample=vec4(0.0);vec3 reflectionCoords=vec3(0.0);float sample_weight=0.0;float total_weight=0.0;float step=1.0/float(max(samples-1,1));for (int i=0; i<samples; ++i) {float t=mix(-1.0,1.0,float(i)*step);t+=step*2.0*noise.x;sample_weight=max(1.0-abs(t),0.001);sample_weight*=sample_weight;t*=min(4.0*alphaT*geoInfo.anisotropy,1.0);vec3 bentNormal;if (t<0.0) {float blend=t+1.0;bentNormal=normalize(mix(-geoInfo.anisotropicTangent,normalW,blend));} else if (t>0.0) {float blend=t;bentNormal=normalize(mix(normalW,geoInfo.anisotropicTangent,blend));} else {bentNormal=normalW;}
if (isRefraction) {reflectionCoords=double_refract(-viewDirectionW,bentNormal,ior);} else {reflectionCoords=reflect(-viewDirectionW,bentNormal);}
reflectionCoords=vec3(reflectionMatrix*vec4(reflectionCoords,0));
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionCoords.z*=-1.0;
#endif
radianceSample=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#ifdef RGBDREFLECTION
environmentRadiance.rgb+=sample_weight*fromRGBD(radianceSample);
#elif defined(GAMMAREFLECTION)
environmentRadiance.rgb+=sample_weight*toLinearSpace(radianceSample.rgb);
#else
environmentRadiance.rgb+=sample_weight*radianceSample.rgb;
#endif
total_weight+=sample_weight;}
environmentRadiance=vec4(environmentRadiance.xyz/float(total_weight),1.0);
#endif
environmentRadiance.rgb*=vec3(vReflectionInfos.x);return environmentRadiance.rgb;}
#endif
#define pbr_inline
vec3 conductorIblFresnel(in ReflectanceParams reflectance,in float NdotV,in float roughness,in vec3 environmentBrdf)
{
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR)
vec3 albedoF0=mix(reflectance.coloredF0,pow(reflectance.coloredF0,vec3(1.4)),roughness);return getF82Specular(NdotV,albedoF0,reflectance.coloredF90,roughness);
#else
return getReflectanceFromBRDFLookup(reflectance.coloredF0,reflectance.coloredF90,environmentBrdf);
#endif
}
#endif
`;o.ShaderStore.IncludesShadersStore[v]||(o.ShaderStore.IncludesShadersStore[v]=h),e.i(179939),e.i(325472);let I="openpbrNormalMapFragment",R=`vec2 uvOffset=vec2(0.0,0.0);
#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
float normalScale=1.0;
#elif defined(GEOMETRY_NORMAL)
float normalScale=vGeometryNormalInfos.y;
#else
float normalScale=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#elif defined(GEOMETRY_NORMAL)
vec2 TBNUV=gl_FrontFacing ? vGeometryNormalUV : -vGeometryNormalUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);
#else
vec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));
#endif
#elif defined(ANISOTROPIC) || defined(FUZZ)
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#else
vec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;mat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));
#endif
#endif
#ifdef PARALLAX
mat3 invTBN=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
#else
#endif
#endif
#ifdef DETAIL
vec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);vec2 detailNormalRG=detailColor.wy*2.0-1.0;float detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));vec3 detailNormal=vec3(detailNormalRG,detailNormalB);
#endif
#ifdef GEOMETRY_COAT_NORMAL
coatNormalW=perturbNormal(TBN,texture2D(geometryCoatNormalSampler,vGeometryCoatNormalUV+uvOffset).xyz,vGeometryCoatNormalInfos.y);
#endif
#ifdef GEOMETRY_NORMAL
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(texture2D(geometryNormalSampler,vGeometryNormalUV).xyz *2.0-1.0);normalW=normalize(mat3(normalMatrix)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,texture2D(geometryNormalSampler,vGeometryNormalUV+uvOffset).xyz,vGeometryNormalInfos.y);
#else
vec3 sampledNormal=texture2D(geometryNormalSampler,vGeometryNormalUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal.xy*=vDetailInfos.z;vec3 blendedNormal=normalize(vec3(sampledNormal.xy+detailNormal.xy,sampledNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal.xy*=vDetailInfos.z;sampledNormal+=vec3(0.0,0.0,1.0);detailNormal*=vec3(-1.0,-1.0,1.0);vec3 blendedNormal=sampledNormal*dot(sampledNormal,detailNormal)/sampledNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,vGeometryNormalInfos.y);
#endif
#elif defined(DETAIL)
detailNormal.xy*=vDetailInfos.z;normalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);
#endif
`;o.ShaderStore.IncludesShadersStore[I]||(o.ShaderStore.IncludesShadersStore[I]=R);let S="openpbrBlockNormalFinal",N=`#if defined(FORCENORMALFORWARD) && defined(NORMAL)
vec3 faceNormal=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*vEyePosition.w;
#if defined(TWOSIDEDLIGHTING)
faceNormal=gl_FrontFacing ? faceNormal : -faceNormal;
#endif
normalW*=sign(dot(normalW,faceNormal));coatNormalW*=sign(dot(coatNormalW,faceNormal));
#endif
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
#if defined(MIRRORED)
normalW=gl_FrontFacing ? -normalW : normalW;coatNormalW=gl_FrontFacing ? -coatNormalW : coatNormalW;
#else
normalW=gl_FrontFacing ? normalW : -normalW;coatNormalW=gl_FrontFacing ? coatNormalW : -coatNormalW;
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[S]||(o.ShaderStore.IncludesShadersStore[S]=N);let A="openpbrBaseLayerData",L=`vec3 base_color=vec3(0.8);float base_metalness=0.0;float base_diffuse_roughness=0.0;float specular_weight=1.0;float specular_roughness=0.3;vec3 specular_color=vec3(1.0);float specular_roughness_anisotropy=0.0;float specular_ior=1.5;float alpha=1.0;vec2 geometry_tangent=vec2(1.0,0.0);float geometry_thickness=0.0;
#ifdef BASE_WEIGHT
vec4 baseWeightFromTexture=texture2D(baseWeightSampler,vBaseWeightUV+uvOffset);
#endif
#ifdef BASE_COLOR
vec4 baseColorFromTexture=texture2D(baseColorSampler,vBaseColorUV+uvOffset);
#endif
#ifdef BASE_METALNESS
vec4 metallicFromTexture=texture2D(baseMetalnessSampler,vBaseMetalnessUV+uvOffset);
#endif
#if defined(SPECULAR_ROUGHNESS_FROM_METALNESS_TEXTURE_GREEN) && defined(BASE_METALNESS)
float roughnessFromTexture=metallicFromTexture.g;
#elif defined(SPECULAR_ROUGHNESS)
float roughnessFromTexture=texture2D(specularRoughnessSampler,vSpecularRoughnessUV+uvOffset).r;
#endif
#ifdef GEOMETRY_TANGENT
vec3 geometryTangentFromTexture=texture2D(geometryTangentSampler,vGeometryTangentUV+uvOffset).rgb;
#endif
#ifdef SPECULAR_ROUGHNESS_ANISOTROPY
float anisotropyFromTexture=texture2D(specularRoughnessAnisotropySampler,vSpecularRoughnessAnisotropyUV+uvOffset).r*vSpecularRoughnessAnisotropyInfos.y;
#endif
#ifdef BASE_DIFFUSE_ROUGHNESS
float baseDiffuseRoughnessFromTexture=texture2D(baseDiffuseRoughnessSampler,vBaseDiffuseRoughnessUV+uvOffset).r;
#endif
#ifdef GEOMETRY_OPACITY
vec4 opacityFromTexture=texture2D(geometryOpacitySampler,vGeometryOpacityUV+uvOffset);
#endif
#ifdef GEOMETRY_THICKNESS
vec4 thicknessFromTexture=texture2D(geometryThicknessSampler,vGeometryThicknessUV+uvOffset);
#endif
#ifdef DECAL
vec4 decalFromTexture=texture2D(decalSampler,vDecalUV+uvOffset);
#endif
#ifdef SPECULAR_COLOR
vec4 specularColorFromTexture=texture2D(specularColorSampler,vSpecularColorUV+uvOffset);
#endif
#ifdef SPECULAR_WEIGHT
#ifdef SPECULAR_WEIGHT_IN_ALPHA
float specularWeightFromTexture=texture2D(specularWeightSampler,vSpecularWeightUV+uvOffset).a;
#else
float specularWeightFromTexture=texture2D(specularWeightSampler,vSpecularWeightUV+uvOffset).r;
#endif
#endif
#if defined(ANISOTROPIC) || defined(FUZZ) || defined(REFRACTED_BACKGROUND)
vec3 noise=vec3(2.0)*texture2D(blueNoiseSampler,gl_FragCoord.xy/256.0).xyz-vec3(1.0);
#endif
base_color=vBaseColor.rgb;
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
base_color*=vColor.rgb;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
base_color*=vec3(vBaseWeight);alpha=vBaseColor.a;base_metalness=vReflectanceInfo.x;base_diffuse_roughness=vBaseDiffuseRoughness;specular_roughness=vReflectanceInfo.y;specular_color=vSpecularColor.rgb;specular_weight=vReflectanceInfo.a;specular_ior=vReflectanceInfo.z;specular_roughness_anisotropy=vSpecularAnisotropy.b;geometry_tangent=vSpecularAnisotropy.rg;geometry_thickness=vGeometryThickness;
#ifdef BASE_COLOR
#ifdef BASE_COLOR_GAMMA
base_color*=toLinearSpace(baseColorFromTexture.rgb);
#else
base_color*=baseColorFromTexture.rgb;
#endif
base_color*=vBaseColorInfos.y;
#endif
#ifdef BASE_WEIGHT
base_color*=baseWeightFromTexture.r;
#endif
#if defined(BASE_COLOR) && defined(ALPHA_FROM_BASE_COLOR_TEXTURE)
alpha*=baseColorFromTexture.a;
#elif defined(GEOMETRY_OPACITY)
alpha*=opacityFromTexture.r;alpha*=vGeometryOpacityInfos.y;
#endif
#ifdef GEOMETRY_THICKNESS
#ifdef GEOMETRY_THICKNESS_FROM_GREEN_CHANNEL
geometry_thickness*=thicknessFromTexture.g;
#else
geometry_thickness*=thicknessFromTexture.r;
#endif
geometry_thickness*=vGeometryThicknessInfos.y;
#endif
#ifdef ALPHATEST
#if DEBUGMODE != 88
if (alpha<ALPHATESTVALUE)
discard;
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
#ifdef BASE_METALNESS
#ifdef BASE_METALNESS_FROM_METALNESS_TEXTURE_BLUE
base_metalness*=metallicFromTexture.b;
#else
base_metalness*=metallicFromTexture.r;
#endif
#endif
#ifdef BASE_DIFFUSE_ROUGHNESS
base_diffuse_roughness*=baseDiffuseRoughnessFromTexture*vBaseDiffuseRoughnessInfos.y;
#endif
#ifdef SPECULAR_COLOR
#ifdef SPECULAR_COLOR_GAMMA
specular_color*=toLinearSpace(specularColorFromTexture.rgb);
#else
specular_color*=specularColorFromTexture.rgb;
#endif
#endif
#ifdef SPECULAR_WEIGHT_FROM_SPECULAR_COLOR_TEXTURE
specular_weight*=specularColorFromTexture.a;
#elif defined(SPECULAR_WEIGHT)
specular_weight*=specularWeightFromTexture;
#endif
#if defined(SPECULAR_ROUGHNESS) || (defined(SPECULAR_ROUGHNESS_FROM_METALNESS_TEXTURE_GREEN) && defined(BASE_METALNESS))
specular_roughness*=roughnessFromTexture;
#endif
#ifdef GEOMETRY_TANGENT
{vec2 tangentFromTexture=normalize(geometryTangentFromTexture.xy*2.0-1.0);float tangent_angle_texture=atan(tangentFromTexture.y,tangentFromTexture.x);float tangent_angle_uniform=atan(geometry_tangent.y,geometry_tangent.x);float tangent_angle=tangent_angle_texture+tangent_angle_uniform;geometry_tangent=vec2(cos(tangent_angle),sin(tangent_angle));}
#endif
#if defined(GEOMETRY_TANGENT) && \
defined(SPECULAR_ROUGHNESS_ANISOTROPY_FROM_TANGENT_TEXTURE)
specular_roughness_anisotropy*=geometryTangentFromTexture.b;
#elif defined(SPECULAR_ROUGHNESS_ANISOTROPY)
specular_roughness_anisotropy*=anisotropyFromTexture;
#endif
#ifdef DETAIL
float detailRoughness=mix(0.5,detailColor.b,vDetailInfos.w);float loLerp=mix(0.,specular_roughness,detailRoughness*2.);float hiLerp=mix(specular_roughness,1.,(detailRoughness-0.5)*2.);specular_roughness=mix(loLerp,hiLerp,step(detailRoughness,0.5));
#endif
#ifdef USE_GLTF_STYLE_ANISOTROPY
float baseAlpha=specular_roughness*specular_roughness;float roughnessT=mix(baseAlpha,1.0,specular_roughness_anisotropy*specular_roughness_anisotropy);float roughnessB=baseAlpha;specular_roughness_anisotropy=1.0-roughnessB/max(roughnessT,0.00001);specular_roughness=sqrt(roughnessT/sqrt(2.0/(1.0+(1.0-specular_roughness_anisotropy)*(1.0-specular_roughness_anisotropy))));
#endif
`;o.ShaderStore.IncludesShadersStore[A]||(o.ShaderStore.IncludesShadersStore[A]=L);let T="openpbrTransmissionLayerData",D=`float transmission_weight=vTransmissionWeight;vec3 transmission_color=vTransmissionColor.rgb;float transmission_depth=vTransmissionDepth;vec3 transmission_scatter=vTransmissionScatter.rgb;float transmission_scatter_anisotropy=vTransmissionScatterAnisotropy;float transmission_dispersion_scale=vTransmissionDispersionScale;float transmission_dispersion_abbe_number=vTransmissionDispersionAbbeNumber;
#ifdef TRANSMISSION_WEIGHT
vec4 transmissionWeightFromTexture=texture2D(transmissionWeightSampler,vTransmissionWeightUV+uvOffset);
#endif
#ifdef TRANSMISSION_COLOR
vec4 transmissionColorFromTexture=texture2D(transmissionColorSampler,vTransmissionColorUV+uvOffset);
#endif
#ifdef TRANSMISSION_DEPTH
vec4 transmissionDepthFromTexture=texture2D(transmissionDepthSampler,vTransmissionDepthUV+uvOffset);
#endif
#ifdef TRANSMISSION_SCATTER
vec4 transmissionScatterFromTexture=texture2D(transmissionScatterSampler,vTransmissionScatterUV+uvOffset);
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
vec4 transmissionDispersionScaleFromTexture=texture2D(transmissionDispersionScaleSampler,vTransmissionDispersionScaleUV+uvOffset);
#endif
#ifdef TRANSMISSION_WEIGHT
transmission_weight*=transmissionWeightFromTexture.r;
#endif
#ifdef TRANSMISSION_COLOR
#ifdef TRANSMISSION_COLOR_GAMMA
transmission_color*=toLinearSpace(transmissionColorFromTexture.rgb);
#else
transmission_color*=transmissionColorFromTexture.rgb;
#endif
transmission_color*=vTransmissionColorInfos.y;
#endif
#ifdef TRANSMISSION_DEPTH
transmission_depth*=transmissionDepthFromTexture.r;
#endif
#ifdef TRANSMISSION_SCATTER
transmission_scatter*=transmissionScatterFromTexture.rgb;
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
transmission_dispersion_scale*=transmissionDispersionScaleFromTexture.r;
#endif
`;o.ShaderStore.IncludesShadersStore[T]||(o.ShaderStore.IncludesShadersStore[T]=D);let F="openpbrCoatLayerData",O=`float coat_weight=0.0;vec3 coat_color=vec3(1.0);float coat_roughness=0.0;float coat_roughness_anisotropy=0.0;float coat_ior=1.6;float coat_darkening=1.0;vec2 geometry_coat_tangent=vec2(1.0,0.0);
#ifdef COAT_WEIGHT
vec4 coatWeightFromTexture=texture2D(coatWeightSampler,vCoatWeightUV+uvOffset);
#endif
#ifdef COAT_COLOR
vec4 coatColorFromTexture=texture2D(coatColorSampler,vCoatColorUV+uvOffset);
#endif
#ifdef COAT_ROUGHNESS
vec4 coatRoughnessFromTexture=texture2D(coatRoughnessSampler,vCoatRoughnessUV+uvOffset);
#endif
#ifdef COAT_ROUGHNESS_ANISOTROPY
float coatRoughnessAnisotropyFromTexture=texture2D(coatRoughnessAnisotropySampler,vCoatRoughnessAnisotropyUV+uvOffset).r;
#endif
#ifdef COAT_DARKENING
vec4 coatDarkeningFromTexture=texture2D(coatDarkeningSampler,vCoatDarkeningUV+uvOffset);
#endif
#ifdef GEOMETRY_COAT_TANGENT
vec3 geometryCoatTangentFromTexture=texture2D(geometryCoatTangentSampler,vGeometryCoatTangentUV+uvOffset).rgb;
#endif
coat_color=vCoatColor.rgb;coat_weight=vCoatWeight;coat_roughness=vCoatRoughness;coat_roughness_anisotropy=vCoatRoughnessAnisotropy;coat_ior=vCoatIor;coat_darkening=vCoatDarkening;geometry_coat_tangent=vGeometryCoatTangent.rg;
#ifdef COAT_WEIGHT
coat_weight*=coatWeightFromTexture.r;
#endif
#ifdef COAT_COLOR
#ifdef COAT_COLOR_GAMMA
coat_color*=toLinearSpace(coatColorFromTexture.rgb);
#else
coat_color*=coatColorFromTexture.rgb;
#endif
coat_color*=vCoatColorInfos.y;
#endif
#ifdef COAT_ROUGHNESS
#ifdef COAT_ROUGHNESS_FROM_GREEN_CHANNEL
coat_roughness*=coatRoughnessFromTexture.g;
#else
coat_roughness*=coatRoughnessFromTexture.r;
#endif
#endif
#if defined(GEOMETRY_COAT_TANGENT) && defined(COAT_ROUGHNESS_ANISOTROPY_FROM_TANGENT_TEXTURE)
coat_roughness_anisotropy*=geometryCoatTangentFromTexture.b;
#elif defined(COAT_ROUGHNESS_ANISOTROPY)
coat_roughness_anisotropy*=coatRoughnessAnisotropyFromTexture;
#endif
#ifdef COAT_DARKENING
coat_darkening*=coatDarkeningFromTexture.r;
#endif
#ifdef GEOMETRY_COAT_TANGENT
{vec2 tangentFromTexture=normalize(geometryCoatTangentFromTexture.xy*2.0-1.0);float tangent_angle_texture=atan(tangentFromTexture.y,tangentFromTexture.x);float tangent_angle_uniform=atan(geometry_coat_tangent.y,geometry_coat_tangent.x);float tangent_angle=tangent_angle_texture+tangent_angle_uniform;geometry_coat_tangent=vec2(cos(tangent_angle),sin(tangent_angle));}
#endif
#ifdef USE_GLTF_STYLE_ANISOTROPY
float coatAlpha=coat_roughness*coat_roughness;float coatRoughnessT=mix(coatAlpha,1.0,coat_roughness_anisotropy*coat_roughness_anisotropy);float coatRoughnessB=coatAlpha;coat_roughness_anisotropy=1.0-coatRoughnessB/max(coatRoughnessT,0.00001);coat_roughness=sqrt(coatRoughnessT/sqrt(2.0/(1.0+(1.0-coat_roughness_anisotropy)*(1.0-coat_roughness_anisotropy))));
#endif
`;o.ShaderStore.IncludesShadersStore[F]||(o.ShaderStore.IncludesShadersStore[F]=O);let C="openpbrThinFilmLayerData",b=`#ifdef THIN_FILM
float thin_film_weight=vThinFilmWeight;float thin_film_thickness=vThinFilmThickness.r*1000.0; 
float thin_film_ior=vThinFilmIor;
#ifdef THIN_FILM_WEIGHT
float thinFilmWeightFromTexture=texture2D(thinFilmWeightSampler,vThinFilmWeightUV+uvOffset).r*vThinFilmWeightInfos.y;
#endif
#ifdef THIN_FILM_THICKNESS
float thinFilmThicknessFromTexture=texture2D(thinFilmThicknessSampler,vThinFilmThicknessUV+uvOffset).g*vThinFilmThicknessInfos.y;
#endif
#ifdef THIN_FILM_WEIGHT
thin_film_weight*=thinFilmWeightFromTexture;
#endif
#ifdef THIN_FILM_THICKNESS
thin_film_thickness*=thinFilmThicknessFromTexture;
#endif
float thin_film_ior_scale=clamp(2.0f*abs(thin_film_ior-1.0f),0.0f,1.0f);
#endif
`;o.ShaderStore.IncludesShadersStore[C]||(o.ShaderStore.IncludesShadersStore[C]=b);let M="openpbrFuzzLayerData",G=`float fuzz_weight=0.0;vec3 fuzz_color=vec3(1.0);float fuzz_roughness=0.0;
#ifdef FUZZ
#ifdef FUZZ_WEIGHT
vec4 fuzzWeightFromTexture=texture2D(fuzzWeightSampler,vFuzzWeightUV+uvOffset);
#endif
#ifdef FUZZ_COLOR
vec4 fuzzColorFromTexture=texture2D(fuzzColorSampler,vFuzzColorUV+uvOffset);
#endif
#ifdef FUZZ_ROUGHNESS
vec4 fuzzRoughnessFromTexture=texture2D(fuzzRoughnessSampler,vFuzzRoughnessUV+uvOffset);
#endif
fuzz_color=vFuzzColor.rgb;fuzz_weight=vFuzzWeight;fuzz_roughness=vFuzzRoughness;
#ifdef FUZZ_WEIGHT
fuzz_weight*=fuzzWeightFromTexture.r;
#endif
#ifdef FUZZ_COLOR
#ifdef FUZZ_COLOR_GAMMA
fuzz_color*=toLinearSpace(fuzzColorFromTexture.rgb);
#else
fuzz_color*=fuzzColorFromTexture.rgb;
#endif
fuzz_color*=vFuzzColorInfos.y;
#endif
#if defined(FUZZ_ROUGHNESS) && defined(FUZZ_ROUGHNESS_FROM_TEXTURE_ALPHA)
fuzz_roughness*=fuzzRoughnessFromTexture.a;
#elif defined(FUZZ_ROUGHNESS)
fuzz_roughness*=fuzzRoughnessFromTexture.r;
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[M]||(o.ShaderStore.IncludesShadersStore[M]=G);let P="openpbrAmbientOcclusionData",x=`vec3 ambient_occlusion=vec3(1.0);float specular_ambient_occlusion=1.0;float coat_specular_ambient_occlusion=1.0;
#ifdef AMBIENT_OCCLUSION
vec3 ambientOcclusionFromTexture=texture2D(ambientOcclusionSampler,vAmbientOcclusionUV+uvOffset).rgb;ambient_occlusion=vec3(ambientOcclusionFromTexture.r*vAmbientOcclusionInfos.y+(1.0-vAmbientOcclusionInfos.y));
#endif
`;o.ShaderStore.IncludesShadersStore[P]||(o.ShaderStore.IncludesShadersStore[P]=x),e.i(979795);let B="openpbrBackgroundTransmission",U=`vec4 slab_translucent_background=vec4(0.,0.,0.,1.);
#ifdef REFRACTED_BACKGROUND
{float refractionLOD=transmission_roughness*vBackgroundRefractionInfos.x;vec2 refractionNoiseOffset=vec2(0.0);
#ifdef DISPERSION
for (int i=0; i<3; i++) {vec3 refractedViewVector=refractedViewVectors[i];
#endif
vec3 refractionUVW=vec3(backgroundRefractionMatrix*(view*vec4(vPositionW+refractedViewVector*geometry_thickness,1.0)));vec2 refractionCoords=refractionUVW.xy/refractionUVW.z;refractionCoords.y=1.0-refractionCoords.y;if (refractionLOD>0.0) {refractionNoiseOffset=(noise.xy+refractedViewVector.xy)/vec2(pow(2.0,vBackgroundRefractionInfos.x-refractionLOD));}
refractionCoords+=refractionNoiseOffset;
#ifdef DISPERSION
slab_translucent_background[i]=texture2DLodEXT(backgroundRefractionSampler,refractionCoords,refractionLOD)[i];}
#else
slab_translucent_background=texture2DLodEXT(backgroundRefractionSampler,refractionCoords,refractionLOD);
#endif
}
#endif
`;o.ShaderStore.IncludesShadersStore[B]||(o.ShaderStore.IncludesShadersStore[B]=U);let y="openpbrEnvironmentLighting",V=`#ifdef REFLECTION
#ifdef FUZZ
vec3 environmentFuzzBrdf=getFuzzBRDFLookup(fuzzGeoInfo.NdotV,sqrt(fuzz_roughness));
#endif
vec3 baseDiffuseEnvironmentLight=sampleIrradiance(
normalW
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,vEnvironmentIrradiance
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,reflectionMatrix
#endif
#ifdef USEIRRADIANCEMAP
,irradianceSampler
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,vReflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,icdfSampler
#endif
#endif
,vReflectionInfos
,viewDirectionW
,base_diffuse_roughness
,base_color
);
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=vec3(0.,0.,0.);
#else
vec2 reflectionCoords=vec2(0.,0.);
#endif
float specularAlphaG=specular_roughness*specular_roughness;
#ifdef ANISOTROPIC_BASE
vec3 baseSpecularEnvironmentLight=sampleRadianceAnisotropic(specularAlphaG,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,baseGeoInfo
,normalW
,viewDirectionW
,vPositionW
,noise
,false 
,1.0 
,reflectionSampler
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#else
reflectionCoords=createReflectionCoords(vPositionW,normalW);vec3 baseSpecularEnvironmentLight=sampleRadiance(specularAlphaG,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,baseGeoInfo
,reflectionSampler
,reflectionCoords
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#endif
#ifdef ANISOTROPIC_BASE
baseSpecularEnvironmentLight=mix(baseSpecularEnvironmentLight.rgb,baseDiffuseEnvironmentLight,specularAlphaG*specularAlphaG*max(1.0-baseGeoInfo.anisotropy,0.3));
#else
baseSpecularEnvironmentLight=mix(baseSpecularEnvironmentLight.rgb,baseDiffuseEnvironmentLight,specularAlphaG);
#endif
vec3 coatEnvironmentLight=vec3(0.,0.,0.);if (coat_weight>0.0) {
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=vec3(0.,0.,0.);
#else
vec2 reflectionCoords=vec2(0.,0.);
#endif
reflectionCoords=createReflectionCoords(vPositionW,coatNormalW);float coatAlphaG=coat_roughness*coat_roughness;
#ifdef ANISOTROPIC_COAT
coatEnvironmentLight=sampleRadianceAnisotropic(coatAlphaG,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,coatGeoInfo
,coatNormalW
,viewDirectionW
,vPositionW
,noise
,false 
,1.0 
,reflectionSampler
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#else
coatEnvironmentLight=sampleRadiance(coatAlphaG,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,coatGeoInfo
,reflectionSampler
,reflectionCoords
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#endif
}
#ifdef FUZZ
float modifiedFuzzRoughness=clamp(fuzz_roughness*(1.0-0.5*environmentFuzzBrdf.y),0.0,1.0);vec3 fuzzEnvironmentLight=vec3(0.0);float totalWeight=0.0;float fuzzIblFresnel=sqrt(environmentFuzzBrdf.z);for (int i=0; i<FUZZ_IBL_SAMPLES; ++i) {float angle=(float(i)+noise.x)*(3.141592*2.0/float(FUZZ_IBL_SAMPLES));vec3 fiberCylinderNormal=normalize(cos(angle)*fuzzTangent+sin(angle)*fuzzBitangent);float fiberBend=min(environmentFuzzBrdf.x*environmentFuzzBrdf.x*modifiedFuzzRoughness,1.0);fiberCylinderNormal=normalize(mix(fiberCylinderNormal,fuzzNormalW,fiberBend));float sampleWeight=max(dot(viewDirectionW,fiberCylinderNormal),0.0);vec3 fuzzReflectionCoords=createReflectionCoords(vPositionW,fiberCylinderNormal);vec3 radianceSample=sampleRadiance(modifiedFuzzRoughness,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,fuzzGeoInfo
,reflectionSampler
,fuzzReflectionCoords
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);fuzzEnvironmentLight+=sampleWeight*mix(radianceSample,baseDiffuseEnvironmentLight,fiberBend);totalWeight+=sampleWeight;}
fuzzEnvironmentLight/=totalWeight;
#endif
float dielectricIblFresnel=getReflectanceFromBRDFLookup(vec3(baseDielectricReflectance.F0),vec3(baseDielectricReflectance.F90),baseGeoInfo.environmentBrdf).r;vec3 dielectricIblColoredFresnel=dielectricIblFresnel*specular_color;
#ifdef THIN_FILM
vec3 thinFilmDielectricFresnel=evalIridescence(thin_film_outside_ior,thin_film_ior,baseGeoInfo.NdotV,thin_film_thickness,baseDielectricReflectance.coloredF0);float thin_film_desaturation_scale=(thin_film_ior-1.0)*sqrt(thin_film_thickness*0.001*baseGeoInfo.NdotV);thinFilmDielectricFresnel=mix(thinFilmDielectricFresnel,vec3(dot(thinFilmDielectricFresnel,vec3(0.3333))),thin_film_desaturation_scale);dielectricIblColoredFresnel=mix(dielectricIblColoredFresnel,thinFilmDielectricFresnel*specular_color,thin_film_weight*thin_film_ior_scale);
#endif
vec3 conductorIblFresnel=conductorIblFresnel(baseConductorReflectance,baseGeoInfo.NdotV,specular_roughness,baseGeoInfo.environmentBrdf);
#ifdef THIN_FILM
vec3 thinFilmConductorFresnel=specular_weight*evalIridescence(thin_film_outside_ior,thin_film_ior,baseGeoInfo.NdotV,thin_film_thickness,baseConductorReflectance.coloredF0);thinFilmConductorFresnel=mix(thinFilmConductorFresnel,vec3(dot(thinFilmConductorFresnel,vec3(0.3333))),thin_film_desaturation_scale);conductorIblFresnel=mix(conductorIblFresnel,thinFilmConductorFresnel,thin_film_weight*thin_film_ior_scale);
#endif
float coatIblFresnel=0.0;if (coat_weight>0.0) {coatIblFresnel=getReflectanceFromBRDFLookup(vec3(coatReflectance.F0),vec3(coatReflectance.F90),coatGeoInfo.environmentBrdf).r;}
vec3 slab_diffuse_ibl=vec3(0.,0.,0.);vec3 slab_glossy_ibl=vec3(0.,0.,0.);vec3 slab_metal_ibl=vec3(0.,0.,0.);vec3 slab_coat_ibl=vec3(0.,0.,0.);slab_diffuse_ibl=baseDiffuseEnvironmentLight*vLightingIntensity.z;
#ifdef AMBIENT_OCCLUSION
specular_ambient_occlusion=compute_specular_occlusion(baseGeoInfo.NdotV,base_metalness,ambient_occlusion.x,specular_roughness);
#endif
slab_glossy_ibl=baseSpecularEnvironmentLight*vLightingIntensity.z;slab_metal_ibl=baseSpecularEnvironmentLight*conductorIblFresnel*vLightingIntensity.z;vec3 coatAbsorption=vec3(1.0);if (coat_weight>0.0) {slab_coat_ibl=coatEnvironmentLight*vLightingIntensity.z;
#ifdef AMBIENT_OCCLUSION
coat_specular_ambient_occlusion=compute_specular_occlusion(coatGeoInfo.NdotV,0.0,ambient_occlusion.x,coat_roughness);
#endif
float hemisphere_avg_fresnel=coatReflectance.F0+0.5*(1.0-coatReflectance.F0);float averageReflectance=(coatIblFresnel+hemisphere_avg_fresnel)*0.5;float roughnessFactor=1.0-coat_roughness*0.5;averageReflectance*=roughnessFactor;float darkened_transmission=(1.0-averageReflectance)*(1.0-averageReflectance);darkened_transmission=mix(1.0,darkened_transmission,coat_darkening);float sin2=1.0-coatGeoInfo.NdotV*coatGeoInfo.NdotV;sin2=sin2/(coat_ior*coat_ior);float cos_t=sqrt(1.0-sin2);float coatPathLength=1.0/cos_t;vec3 colored_transmission=pow(coat_color,vec3(coatPathLength));coatAbsorption=mix(vec3(1.0),colored_transmission*darkened_transmission,coat_weight);}
#ifdef FUZZ
vec3 slab_fuzz_ibl=fuzzEnvironmentLight*vLightingIntensity.z;
#endif
vec3 slab_translucent_base_ibl=slab_translucent_background.rgb*transmission_absorption;
#ifdef REFRACTED_ENVIRONMENT
#ifdef ANISOTROPIC_BASE
vec3 environmentRefraction=sampleRadianceAnisotropic(roughness_alpha_modified_for_scatter,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,baseGeoInfo
,normalW
,viewDirectionW
,vPositionW
,noise
,true 
,specular_ior 
,reflectionSampler
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#else
vec3 environmentRefraction=vec3(0.,0.,0.);
#ifdef DISPERSION
for (int i=0; i<3; i++) {vec3 iblRefractionCoords=refractedViewVectors[i];
#else
vec3 iblRefractionCoords=refractedViewVector;
#endif
#ifdef REFRACTED_ENVIRONMENT_OPPOSITEZ
iblRefractionCoords.z*=-1.0;
#endif
#ifdef REFRACTED_ENVIRONMENT_LOCAL_CUBE
iblRefractionCoords=parallaxCorrectNormal(vPositionW,refractedViewVector,refractionSize,refractionPosition);
#endif
iblRefractionCoords=vec3(reflectionMatrix*vec4(iblRefractionCoords,0));
#ifdef DISPERSION
environmentRefraction[i]=sampleRadiance(roughness_alpha_modified_for_scatter,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,baseGeoInfo
,reflectionSampler
,iblRefractionCoords
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
)[i];
#else
environmentRefraction=sampleRadiance(roughness_alpha_modified_for_scatter,vReflectionMicrosurfaceInfos.rgb,vReflectionInfos
,baseGeoInfo
,reflectionSampler
,iblRefractionCoords
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#endif
);
#endif
#ifdef DISPERSION
}
#endif
#endif
#ifdef REFRACTED_BACKGROUND
environmentRefraction*=max(roughness_alpha_modified_for_scatter*roughness_alpha_modified_for_scatter-0.1,0.0);
#endif
#ifdef SCATTERING
#if defined(USEIRRADIANCEMAP) && defined(USE_IRRADIANCE_DOMINANT_DIRECTION)
vec3 scatterVector=mix(vReflectionDominantDirection,normalW,max3(iso_scatter_density));
#else
vec3 scatterVector=normalW;
#endif
scatterVector=mix(viewDirectionW,scatterVector,back_to_iso_scattering_blend);vec3 scatteredEnvironmentLight=sampleIrradiance(
scatterVector
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,vEnvironmentIrradiance
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,reflectionMatrix
#endif
#ifdef USEIRRADIANCEMAP
,irradianceSampler
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,vReflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,icdfSampler
#endif
#endif
,vReflectionInfos
,viewDirectionW
,1.0
,multi_scatter_color
);if (transmission_depth>0.0) {vec3 forward_scattered_light=environmentRefraction*transmission_absorption;vec3 back_scattered_light=mix(forward_scattered_light,scatteredEnvironmentLight*absorption_at_mfp,iso_scatter_density);vec3 iso_scattered_light=mix(forward_scattered_light,scatteredEnvironmentLight*multi_scatter_color,iso_scatter_density);slab_translucent_base_ibl=mix(back_scattered_light,iso_scattered_light,back_to_iso_scattering_blend);slab_translucent_base_ibl=mix(slab_translucent_base_ibl,forward_scattered_light,iso_to_forward_scattering_blend);} else {slab_translucent_base_ibl+=environmentRefraction.rgb;}
#else
slab_translucent_base_ibl+=environmentRefraction*transmission_absorption;
#endif
#endif
vec3 slab_subsurface_ibl=vec3(0.,0.,0.);slab_diffuse_ibl*=base_color.rgb;
#define CUSTOM_FRAGMENT_BEFORE_IBLLAYERCOMPOSITION
slab_diffuse_ibl*=ambient_occlusion;slab_metal_ibl*=specular_ambient_occlusion;slab_glossy_ibl*=specular_ambient_occlusion;slab_coat_ibl*=coat_specular_ambient_occlusion;vec3 material_opaque_base_ibl=mix(slab_diffuse_ibl,slab_subsurface_ibl,subsurface_weight);vec3 material_dielectric_base_ibl=mix(material_opaque_base_ibl,slab_translucent_base_ibl,transmission_weight);vec3 material_dielectric_gloss_ibl=material_dielectric_base_ibl*(1.0-dielectricIblFresnel)+slab_glossy_ibl*dielectricIblColoredFresnel;vec3 material_base_substrate_ibl=mix(material_dielectric_gloss_ibl,slab_metal_ibl,base_metalness);vec3 material_coated_base_ibl=layer(material_base_substrate_ibl,slab_coat_ibl,coatIblFresnel,coatAbsorption,vec3(1.0));
#ifdef FUZZ
slab_fuzz_ibl*=ambient_occlusion;material_surface_ibl=layer(material_coated_base_ibl,slab_fuzz_ibl,fuzzIblFresnel*fuzz_weight,vec3(1.0),fuzz_color);
#else
material_surface_ibl=material_coated_base_ibl;
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[y]||(o.ShaderStore.IncludesShadersStore[y]=V);let H="openpbrDirectLightingInit",z=`#ifdef LIGHT{X}
preLightingInfo preInfo{X};preLightingInfo preInfoCoat{X};vec4 lightColor{X}=light{X}.vLightDiffuse;float shadow{X}=1.;
#if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})
#else
#define CUSTOM_LIGHT{X}_COLOR 
#ifdef SPOTLIGHT{X}
preInfo{X}=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW,vPositionW);preInfoCoat{X}=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,coatNormalW,vPositionW);
#elif defined(POINTLIGHT{X})
preInfo{X}=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW,vPositionW);preInfoCoat{X}=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,coatNormalW,vPositionW);
#elif defined(HEMILIGHT{X})
preInfo{X}=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);preInfoCoat{X}=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,coatNormalW);
#elif defined(DIRLIGHT{X})
preInfo{X}=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);preInfoCoat{X}=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,coatNormalW);
#elif defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
preInfo{X}=computeAreaPreLightingInfo(areaLightsLTC1Sampler,areaLightsLTC2Sampler,viewDirectionW,normalW,vPositionW,light{X}.vLightData,light{X}.vLightWidth.xyz,light{X}.vLightHeight.xyz,specular_roughness);preInfoCoat{X}=computeAreaPreLightingInfo(areaLightsLTC1Sampler,areaLightsLTC2Sampler,viewDirectionW,coatNormalW,vPositionW,light{X}.vLightData,light{X}.vLightWidth.xyz,light{X}.vLightHeight.xyz,coat_roughness);
#endif
preInfo{X}.NdotV=baseGeoInfo.NdotV;preInfoCoat{X}.NdotV=coatGeoInfo.NdotV;
#ifdef SPOTLIGHT{X}
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo{X}.attenuation=computeDistanceLightFalloff_GLTF(preInfo{X}.lightDistanceSquared,light{X}.vLightFalloff.y);
#ifdef IESLIGHTTEXTURE{X}
preInfo{X}.attenuation*=computeDirectionalLightFalloff_IES(light{X}.vLightDirection.xyz,preInfo{X}.L,iesLightTexture{X});
#else
preInfo{X}.attenuation*=computeDirectionalLightFalloff_GLTF(light{X}.vLightDirection.xyz,preInfo{X}.L,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#endif
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo{X}.attenuation=computeDistanceLightFalloff_Physical(preInfo{X}.lightDistanceSquared);
#ifdef IESLIGHTTEXTURE{X}
preInfo{X}.attenuation*=computeDirectionalLightFalloff_IES(light{X}.vLightDirection.xyz,preInfo{X}.L,iesLightTexture{X});
#else
preInfo{X}.attenuation*=computeDirectionalLightFalloff_Physical(light{X}.vLightDirection.xyz,preInfo{X}.L,light{X}.vLightDirection.w);
#endif
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo{X}.attenuation=computeDistanceLightFalloff_Standard(preInfo{X}.lightOffset,light{X}.vLightFalloff.x);
#ifdef IESLIGHTTEXTURE{X}
preInfo{X}.attenuation*=computeDirectionalLightFalloff_IES(light{X}.vLightDirection.xyz,preInfo{X}.L,iesLightTexture{X});
#else
preInfo{X}.attenuation*=computeDirectionalLightFalloff_Standard(light{X}.vLightDirection.xyz,preInfo{X}.L,light{X}.vLightDirection.w,light{X}.vLightData.w);
#endif
#else
preInfo{X}.attenuation=computeDistanceLightFalloff(preInfo{X}.lightOffset,preInfo{X}.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
#ifdef IESLIGHTTEXTURE{X}
preInfo{X}.attenuation*=computeDirectionalLightFalloff_IES(light{X}.vLightDirection.xyz,preInfo{X}.L,iesLightTexture{X});
#else
preInfo{X}.attenuation*=computeDirectionalLightFalloff(light{X}.vLightDirection.xyz,preInfo{X}.L,light{X}.vLightDirection.w,light{X}.vLightData.w,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#endif
#endif
#elif defined(POINTLIGHT{X})
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo{X}.attenuation=computeDistanceLightFalloff_GLTF(preInfo{X}.lightDistanceSquared,light{X}.vLightFalloff.y);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo{X}.attenuation=computeDistanceLightFalloff_Physical(preInfo{X}.lightDistanceSquared);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo{X}.attenuation=computeDistanceLightFalloff_Standard(preInfo{X}.lightOffset,light{X}.vLightFalloff.x);
#else
preInfo{X}.attenuation=computeDistanceLightFalloff(preInfo{X}.lightOffset,preInfo{X}.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
#endif
#else
preInfo{X}.attenuation=1.0;
#endif
preInfoCoat{X}.attenuation=preInfo{X}.attenuation;
#if defined(HEMILIGHT{X})
preInfo{X}.roughness=specular_roughness;preInfoCoat{X}.roughness=coat_roughness;
#elif defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
preInfo{X}.roughness=specular_roughness;preInfoCoat{X}.roughness=coat_roughness;
#else
preInfo{X}.roughness=adjustRoughnessFromLightProperties(specular_roughness,light{X}.vLightSpecular.a,preInfo{X}.lightDistance);preInfoCoat{X}.roughness=adjustRoughnessFromLightProperties(coat_roughness,light{X}.vLightSpecular.a,preInfoCoat{X}.lightDistance);
#endif
preInfo{X}.diffuseRoughness=base_diffuse_roughness;preInfo{X}.surfaceAlbedo=base_color.rgb;
#endif
#endif
`;o.ShaderStore.IncludesShadersStore[H]||(o.ShaderStore.IncludesShadersStore[H]=z);let W="openpbrDirectLighting",X=`#ifdef LIGHT{X}
{vec3 slab_diffuse=vec3(0.,0.,0.);vec3 slab_subsurface=vec3(0.,0.,0.);vec3 slab_translucent=slab_translucent_background.rgb;vec3 slab_glossy=vec3(0.,0.,0.);float specularFresnel=0.0;vec3 specularColoredFresnel=vec3(0.,0.,0.);vec3 slab_metal=vec3(0.,0.,0.);vec3 slab_coat=vec3(0.,0.,0.);float coatFresnel=0.0;vec3 slab_fuzz=vec3(0.,0.,0.);float fuzzFresnel=0.0;
#ifdef HEMILIGHT{X}
slab_diffuse=computeHemisphericDiffuseLighting(preInfo{X},lightColor{X}.rgb,light{X}.vLightGround);
#elif defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
slab_diffuse=computeAreaDiffuseLighting(preInfo{X},lightColor{X}.rgb);
#else
slab_diffuse=computeDiffuseLighting(preInfo{X},lightColor{X}.rgb);
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
slab_diffuse*=computeProjectionTextureDiffuseLighting(projectionLightTexture{X},textureProjectionMatrix{X},vPositionW);
#endif
#ifdef FUZZ
float fuzzNdotH=max(dot(fuzzNormalW,preInfo{X}.H),0.0);vec3 fuzzBrdf=getFuzzBRDFLookup(fuzzNdotH,sqrt(fuzz_roughness));
#endif
#ifdef THIN_FILM
float thin_film_desaturation_scale=(thin_film_ior-1.0)*sqrt(thin_film_thickness*0.001);
#endif
#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
slab_glossy=computeAreaSpecularLighting(preInfo{X},light{X}.vLightSpecular.rgb,baseConductorReflectance.F0,baseConductorReflectance.F90);
#else
{
#ifdef ANISOTROPIC_BASE
slab_glossy=computeAnisotropicSpecularLighting(preInfo{X},viewDirectionW,normalW,
baseGeoInfo.anisotropicTangent,baseGeoInfo.anisotropicBitangent,baseGeoInfo.anisotropy,
0.0,lightColor{X}.rgb);
#else
slab_glossy=computeSpecularLighting(preInfo{X},normalW,vec3(1.0),vec3(1.0),specular_roughness,lightColor{X}.rgb);
#endif
specularFresnel=fresnelSchlickGGX(preInfo{X}.VdotH,baseDielectricReflectance.F0,baseDielectricReflectance.F90);specularColoredFresnel=specularFresnel*specular_color;
#ifdef THIN_FILM
vec3 thinFilmDielectricFresnel=evalIridescence(thin_film_outside_ior,thin_film_ior,preInfo{X}.VdotH,thin_film_thickness,baseDielectricReflectance.coloredF0);thinFilmDielectricFresnel=mix(thinFilmDielectricFresnel,vec3(dot(thinFilmDielectricFresnel,vec3(0.3333))),thin_film_desaturation_scale);specularColoredFresnel=mix(specularColoredFresnel,thinFilmDielectricFresnel*specular_color,thin_film_weight*thin_film_ior_scale);
#endif
}
#endif
#ifdef REFRACTED_LIGHTS
#if AREALIGHT{X}
#else
{preLightingInfo preInfoTrans=preInfo{X};
#ifdef SCATTERING
preInfoTrans.roughness=sqrt(sqrt(max(refractionAlphaG,0.05)));
#else
preInfoTrans.roughness=transmission_roughness;
#endif
if (preInfoTrans.NdotLUnclamped<=0.0) {specularFresnel=0.0;specularColoredFresnel=specularFresnel*specular_color;}
#ifdef ANISOTROPIC_BASE
preInfoTrans.NdotL=max(dot(-normalW,preInfoTrans.L),0.0);
#else
preInfoTrans.NdotL=max(dot(-normalW,preInfoTrans.L)*0.5+0.5,0.0);
#endif
#ifdef DISPERSION
float diff=min(dispersion_iors[2]-dispersion_iors[0],max(dispersion_iors[0]-1.0,1.0));dispersion_iors[2]+=diff;dispersion_iors[0]-=diff;for (int i=0; i<3; i++) {float eta=1.0/dispersion_iors[i];
#else
float eta=1.0/specular_ior;
#endif
preInfoTrans.H=-normalize( preInfoTrans.L+min(eta,0.95)*viewDirectionW);preInfoTrans.VdotH=clamp(dot(viewDirectionW,preInfoTrans.H),0.0,1.0);
#ifdef DISPERSION
slab_translucent[i]+=
#else
slab_translucent+=
#endif
#ifdef ANISOTROPIC_BASE
computeAnisotropicSpecularLighting(preInfoTrans,viewDirectionW,normalW,
baseGeoInfo.anisotropicTangent,baseGeoInfo.anisotropicBitangent,baseGeoInfo.anisotropy,
roughness_alpha_modified_for_scatter,lightColor{X}.rgb
#else
computeSpecularLighting(preInfoTrans,normalW,vec3(1.0),vec3(1.0),roughness_alpha_modified_for_scatter,lightColor{X}.rgb
#endif
#ifdef DISPERSION
)[i];}
#else
);
#endif
slab_translucent=mix(slab_translucent,0.25*preInfoTrans.attenuation*lightColor{X}.rgb,clamp(1.0-pow(baseGeoInfo.NdotV,refractionAlphaG),0.0,1.0));
#ifdef SCATTERING
if (transmission_depth>0.0) {preInfoTrans.roughness=1.0;vec3 diffused_forward_scattered_light=computeSpecularLighting(preInfoTrans,normalW,vec3(1.0),vec3(1.0),1.0,lightColor{X}.rgb)*transmission_absorption;preInfoTrans.NdotL=max(dot(viewDirectionW,preInfoTrans.L),0.0);preInfoTrans.NdotV=1.0;preInfoTrans.H=normalize(viewDirectionW+preInfoTrans.L);preInfoTrans.VdotH=clamp(dot(viewDirectionW,preInfoTrans.H),0.0,1.0);preInfoTrans.roughness=0.3;vec3 back_scattered_light=computeSpecularLighting(preInfoTrans,viewDirectionW,vec3(1.0),vec3(1.0),0.025,lightColor{X}.rgb);vec3 forward_scattered_light=(slab_translucent*transmission_absorption);vec3 iso_scattered_light=slab_diffuse;vec3 back_scattering=mix(forward_scattered_light,forward_scattered_light+back_scattered_light*absorption_at_mfp,max3(iso_scatter_density));vec3 iso_scattering=mix(forward_scattered_light,(diffused_forward_scattered_light+iso_scattered_light)*mix(transmission_scatter.rgb,multi_scatter_color,max3(iso_scatter_density)),max3(iso_scatter_density));slab_translucent=mix(back_scattering,iso_scattering,back_to_iso_scattering_blend);slab_translucent=mix(slab_translucent,forward_scattered_light,iso_to_forward_scattering_blend);}
#else
slab_translucent*=transmission_absorption;
#endif
}
#endif
#endif
#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
slab_metal=computeAreaSpecularLighting(preInfo{X},light{X}.vLightSpecular.rgb,baseConductorReflectance.F0,baseConductorReflectance.F90);
#else
{
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR)
vec3 coloredFresnel=getF82Specular(preInfo{X}.VdotH,baseConductorReflectance.coloredF0,baseConductorReflectance.coloredF90,specular_roughness);
#else
vec3 coloredFresnel=fresnelSchlickGGX(preInfo{X}.VdotH,baseConductorReflectance.coloredF0,baseConductorReflectance.coloredF90);
#endif
#ifdef THIN_FILM
vec3 thinFilmConductorFresnel=evalIridescence(thin_film_outside_ior,thin_film_ior,preInfo{X}.VdotH,thin_film_thickness,baseConductorReflectance.coloredF0);thinFilmConductorFresnel=mix(thinFilmConductorFresnel,vec3(dot(thinFilmConductorFresnel,vec3(0.3333))),thin_film_desaturation_scale);coloredFresnel=mix(coloredFresnel,specular_weight*thin_film_ior_scale*thinFilmConductorFresnel,thin_film_weight);
#endif
#ifdef ANISOTROPIC_BASE
slab_metal=computeAnisotropicSpecularLighting(preInfo{X},viewDirectionW,normalW,baseGeoInfo.anisotropicTangent,baseGeoInfo.anisotropicBitangent,baseGeoInfo.anisotropy,0.0,lightColor{X}.rgb);
#else
slab_metal=computeSpecularLighting(preInfo{X},normalW,vec3(1.0),coloredFresnel,specular_roughness,lightColor{X}.rgb);
#endif
}
#endif
#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
slab_coat=computeAreaSpecularLighting(preInfoCoat{X},light{X}.vLightSpecular.rgb,coatReflectance.F0,coatReflectance.F90);
#else
{
#ifdef ANISOTROPIC_COAT
slab_coat=computeAnisotropicSpecularLighting(preInfoCoat{X},viewDirectionW,coatNormalW,
coatGeoInfo.anisotropicTangent,coatGeoInfo.anisotropicBitangent,coatGeoInfo.anisotropy,
0.0,lightColor{X}.rgb);
#else
slab_coat=computeSpecularLighting(preInfoCoat{X},coatNormalW,vec3(coatReflectance.F0),vec3(1.0),coat_roughness,lightColor{X}.rgb);
#endif
float NdotH=max(dot(coatNormalW,preInfoCoat{X}.H),0.0);coatFresnel=fresnelSchlickGGX(NdotH,coatReflectance.F0,coatReflectance.F90);}
#endif
vec3 coatAbsorption=vec3(1.0);if (coat_weight>0.0) {float cosTheta_view=max(preInfoCoat{X}.NdotV,0.001);float cosTheta_light=max(preInfoCoat{X}.NdotL,0.001);float fresnel_view=coatReflectance.F0+(1.0-coatReflectance.F0)*pow(1.0-cosTheta_view,5.0);float fresnel_light=coatReflectance.F0+(1.0-coatReflectance.F0)*pow(1.0-cosTheta_light,5.0);float averageReflectance=(fresnel_view+fresnel_light)*0.5;float darkened_transmission=(1.0-averageReflectance)/(1.0+averageReflectance);darkened_transmission=mix(1.0,darkened_transmission,coat_darkening);float sin2=1.0-cosTheta_view*cosTheta_view;sin2=sin2/(coat_ior*coat_ior);float cos_t=sqrt(1.0-sin2);float coatPathLength=1.0/cos_t;vec3 colored_transmission=pow(coat_color,vec3(coatPathLength));coatAbsorption=mix(vec3(1.0),colored_transmission*darkened_transmission,coat_weight);}
#ifdef FUZZ
fuzzFresnel=fuzzBrdf.z;vec3 fuzzNormalW=mix(normalW,coatNormalW,coat_weight);float fuzzNdotV=max(dot(fuzzNormalW,viewDirectionW.xyz),0.0);float fuzzNdotL=max(dot(fuzzNormalW,preInfo{X}.L),0.0);slab_fuzz=lightColor{X}.rgb*preInfo{X}.attenuation*evalFuzz(preInfo{X}.L,fuzzNdotL,fuzzNdotV,fuzzTangent,fuzzBitangent,fuzzBrdf);
#else
vec3 fuzz_color=vec3(0.0);
#endif
slab_diffuse*=base_color.rgb;vec3 material_opaque_base=mix(slab_diffuse,slab_subsurface,subsurface_weight);vec3 material_dielectric_base=mix(material_opaque_base,slab_translucent,transmission_weight);vec3 material_dielectric_gloss=material_dielectric_base*(1.0-specularFresnel)+slab_glossy*specularColoredFresnel;vec3 material_base_substrate=mix(material_dielectric_gloss,slab_metal,base_metalness);vec3 material_coated_base=layer(material_base_substrate,slab_coat,coatFresnel,coatAbsorption,vec3(1.0));material_surface_direct+=layer(material_coated_base,slab_fuzz,fuzzFresnel*fuzz_weight,vec3(1.0),fuzz_color);}
#endif
`;o.ShaderStore.IncludesShadersStore[W]||(o.ShaderStore.IncludesShadersStore[W]=X),e.i(349426),e.i(372079),e.i(586272),e.i(728767),e.i(556015),e.i(460382);let w="openpbrPixelShader",k=`#define OPENPBR_FRAGMENT_SHADER
#define CUSTOM_FRAGMENT_EXTENSION
#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL) || !defined(NORMAL) || defined(FORCENORMALFORWARD) || defined(SPECULARAA)
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef LODBASEDMICROSFURACE
#extension GL_EXT_shader_texture_lod : enable
#endif
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
precision highp float;
#include<oitDeclaration>
#ifndef FROMLINEARSPACE
#define FROMLINEARSPACE
#endif
#include<__decl__openpbrFragment>
#include<pbrFragmentExtraDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<openpbrFragmentSamplersDeclaration>
#include<imageProcessingDeclaration>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#include<helperFunctions>
#include<subSurfaceScatteringFunctions>
#include<importanceSampling>
#include<pbrHelperFunctions>
#include<imageProcessingFunctions>
#include<shadowsFragmentFunctions>
#include<harmonicsFunctions>
#include<pbrDirectLightingSetupFunctions>
#include<pbrDirectLightingFalloffFunctions>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
#include<pbrDirectLightingFunctions>
#include<pbrIBLFunctions>
#include<openpbrNormalMapFragmentMainFunctions>
#include<openpbrNormalMapFragmentFunctions>
#ifdef REFLECTION
#include<reflectionFunction>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<openpbrDielectricReflectance>
#include<openpbrConductorReflectance>
#include<openpbrAmbientOcclusionFunctions>
#include<openpbrGeometryInfo>
#include<openpbrIblFunctions>
vec3 layer(vec3 slab_bottom,vec3 slab_top,float lerp_factor,vec3 bottom_multiplier,vec3 top_multiplier) {return mix(slab_bottom*bottom_multiplier,slab_top*top_multiplier,lerp_factor);}
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#include<pbrBlockNormalGeometric>
vec3 coatNormalW=normalW;
#include<openpbrNormalMapFragment>
#include<openpbrBlockNormalFinal>
#include<openpbrBaseLayerData>
#include<openpbrTransmissionLayerData>
#include<openpbrCoatLayerData>
#include<openpbrThinFilmLayerData>
#include<openpbrFuzzLayerData>
#include<openpbrAmbientOcclusionData>
float subsurface_weight=0.0;
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
#include<depthPrePass>
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
#ifdef ANISOTROPIC_COAT
geometryInfoAnisoOutParams coatGeoInfo=geometryInfoAniso(
coatNormalW,viewDirectionW.xyz,coat_roughness,geometricNormalW
,vec3(geometry_coat_tangent.x,geometry_coat_tangent.y,coat_roughness_anisotropy),TBN
);
#else
geometryInfoOutParams coatGeoInfo=geometryInfo(
coatNormalW,viewDirectionW.xyz,coat_roughness,geometricNormalW
);
#endif
specular_roughness=mix(specular_roughness,pow(min(1.0,pow(specular_roughness,4.0)+2.0*pow(coat_roughness,4.0)),0.25),coat_weight);
#ifdef ANISOTROPIC_BASE
geometryInfoAnisoOutParams baseGeoInfo=geometryInfoAniso(
normalW,viewDirectionW.xyz,specular_roughness,geometricNormalW
,vec3(geometry_tangent.x,geometry_tangent.y,specular_roughness_anisotropy),TBN
);
#else
geometryInfoOutParams baseGeoInfo=geometryInfo(
normalW,viewDirectionW.xyz,specular_roughness,geometricNormalW
);
#endif
#ifdef FUZZ
vec3 fuzzNormalW=normalize(mix(normalW,coatNormalW,coat_weight));vec3 fuzzTangent=normalize(TBN[0]);fuzzTangent=normalize(fuzzTangent-dot(fuzzTangent,fuzzNormalW)*fuzzNormalW);vec3 fuzzBitangent=cross(fuzzNormalW,fuzzTangent);geometryInfoOutParams fuzzGeoInfo=geometryInfo(
fuzzNormalW,viewDirectionW.xyz,fuzz_roughness,geometricNormalW
);
#endif
ReflectanceParams coatReflectance;coatReflectance=dielectricReflectance(
coat_ior 
,1.0 
,vec3(1.0)
,coat_weight
);
#ifdef THIN_FILM
float thin_film_outside_ior=mix(1.0,coat_ior,coat_weight);
#endif
ReflectanceParams baseDielectricReflectance;{float effectiveCoatIor=mix(1.0,coat_ior,coat_weight);baseDielectricReflectance=dielectricReflectance(
specular_ior 
,effectiveCoatIor 
,specular_color
,specular_weight
);}
ReflectanceParams baseConductorReflectance;baseConductorReflectance=conductorReflectance(base_color,specular_color,specular_weight);vec3 transmission_absorption=vec3(1.0);
#if defined(REFRACTED_BACKGROUND) || defined(REFRACTED_ENVIRONMENT) || defined(REFRACTED_LIGHTS)
#ifdef DISPERSION
vec3 refractedViewVectors[3];float iorDispersionSpread=transmission_dispersion_scale/transmission_dispersion_abbe_number*(specular_ior-1.0);vec3 dispersion_iors=vec3(specular_ior-iorDispersionSpread,specular_ior,specular_ior+iorDispersionSpread);for (int i=0; i<3; i++) {refractedViewVectors[i]=double_refract(-viewDirectionW,normalW,dispersion_iors[i]); }
#else
vec3 refractedViewVector=double_refract(-viewDirectionW,normalW,specular_ior);
#endif
float transmission_roughness=specular_roughness*clamp(4.0*(specular_ior-1.0),0.001,1.0);vec3 extinction_coeff=vec3(0.0);vec3 scatter_coeff=vec3(0.0);vec3 absorption_coeff=vec3(0.0);vec3 ss_albedo=vec3(0.0);vec3 multi_scatter_color=vec3(1.0);if (transmission_depth>0.0) {vec3 invDepth=vec3(1./maxEps(transmission_depth));extinction_coeff=-log(transmission_color.rgb)*invDepth;scatter_coeff=transmission_scatter.rgb*invDepth;absorption_coeff=extinction_coeff-scatter_coeff.rgb;float minCoeff=min3(absorption_coeff);if (minCoeff<0.0) {absorption_coeff-=vec3(minCoeff);}
extinction_coeff=absorption_coeff+scatter_coeff;ss_albedo=scatter_coeff/(extinction_coeff);multi_scatter_color=singleScatterToMultiScatterAlbedo(ss_albedo);transmission_absorption=exp(-absorption_coeff*geometry_thickness);} else {transmission_absorption=transmission_color.rgb*transmission_color.rgb;}
float refractionAlphaG=transmission_roughness*transmission_roughness;
#ifdef SCATTERING
float back_to_iso_scattering_blend=min(1.0+transmission_scatter_anisotropy,1.0);float iso_to_forward_scattering_blend=max(transmission_scatter_anisotropy,0.0);vec3 iso_scatter_transmittance=pow(exp(-extinction_coeff*geometry_thickness),vec3(0.2));vec3 iso_scatter_density=clamp(vec3(1.0)-iso_scatter_transmittance,0.0,1.0);float roughness_alpha_modified_for_scatter=min(refractionAlphaG+(1.0-abs(transmission_scatter_anisotropy))*max3(iso_scatter_density*iso_scatter_density),1.0);roughness_alpha_modified_for_scatter=pow(roughness_alpha_modified_for_scatter,6.0);roughness_alpha_modified_for_scatter=clamp(roughness_alpha_modified_for_scatter,refractionAlphaG,1.0);
#else
float roughness_alpha_modified_for_scatter=refractionAlphaG;
#endif
vec3 transport_mfp=vec3(2.0)/scatter_coeff;vec3 absorption_at_mfp=exp(-absorption_coeff*transport_mfp);
#endif
#include<openpbrBackgroundTransmission>
vec3 material_surface_ibl=vec3(0.,0.,0.);
#include<openpbrEnvironmentLighting>
vec3 material_surface_direct=vec3(0.,0.,0.);
#ifdef REFLECTION
slab_translucent_background=vec4(0.,0.,0.,1.);
#else
slab_translucent_background/=float(LIGHTCOUNT); 
#endif
#if defined(LIGHT0)
float aggShadow=0.;
#include<openpbrDirectLightingInit>[0..maxSimultaneousLights]
#include<openpbrDirectLighting>[0..maxSimultaneousLights]
#endif
vec3 material_surface_emission=vEmissionColor;
#ifdef EMISSION_COLOR
vec3 emissionColorTex=texture2D(emissionColorSampler,vEmissionColorUV+uvOffset).rgb;
#ifdef EMISSION_COLOR_GAMMA
material_surface_emission*=toLinearSpace(emissionColorTex.rgb);
#else
material_surface_emission*=emissionColorTex.rgb;
#endif
material_surface_emission*= vEmissionColorInfos.y;
#endif
material_surface_emission*=vLightingIntensity.y;
#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION
vec4 finalColor=vec4(material_surface_ibl+material_surface_direct+material_surface_emission,alpha);
#define CUSTOM_FRAGMENT_BEFORE_FOG
finalColor=max(finalColor,0.0);
#include<logDepthFragment>
#include<fogFragment>(color,finalColor)
#include<pbrBlockImageProcessing>
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
#include<pbrBlockPrePass>
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=finalColor;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {frontColor.rgb+=finalColor.rgb*finalColor.a*alphaMultiplier;frontColor.a=1.0-alphaMultiplier*(1.0-finalColor.a);} else {backColor+=finalColor;}
#endif
#include<pbrDebug>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;o.ShaderStore.ShadersStore[w]||(o.ShaderStore.ShadersStore[w]=k),e.s(["openpbrPixelShader",0,{name:w,shader:k}],640333)}]);