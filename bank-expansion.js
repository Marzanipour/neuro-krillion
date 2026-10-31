// Original educational content. Points are editorial rarity tiers, not survey data.
// Every set has an introductory-course 100-point anchor and specialist 85-point answers.
// Canonical answer | points | explanation | optional aliases separated with ~.
const EXPANSION_SOURCES = {
  core: 'https://www.ncbi.nlm.nih.gov/books/NBK10799/toc/',
  atlas: 'https://celltypes.brain-map.org/',
  imaging: 'https://www.janelia.org/project-team/genie/research',
  electrodes: 'https://www.janelia.org/open-science/neuropixels',
  microscopy: 'https://www.janelia.org/lab/hess-lab/research/super-resolution-3d-optical-microscopy/palm-optical-microscopy-with-resolution',
  perturbation: 'https://www.jax.org/research-and-faculty/resources/optogenetics-resource',
  sensory: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7299528/',
  barrier: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5474951/',
  clinical: 'https://www.ninds.nih.gov/health-information/disorders'
};
const expansionContent = `
@csf-route|Name a structure that produces, contains, or drains cerebrospinal fluid.|Cerebrospinal fluid|Follow fluid from the ventricles to the space around the brain.|Subarachnoid space
Lateral ventricle|10|A paired cavity in the cerebral hemispheres.|lateral ventricles
Third ventricle|30|A midline cavity in the diencephalon.|3rd ventricle
Fourth ventricle|30|A cavity between the brainstem and cerebellum.|4th ventricle
Choroid plexus|30|A vascular epithelial structure producing most CSF.
Subarachnoid space|100|The fluid-filled space between arachnoid and pia.
Cerebral aqueduct|60|Connects the third and fourth ventricles.|aqueduct of Sylvius
Interventricular foramen|60|Connects a lateral ventricle to the third ventricle.|foramen of Monro
Median aperture|60|An opening from the fourth ventricle to the subarachnoid space.|foramen of Magendie
Lateral aperture|60|A lateral fourth-ventricle outlet.|foramen of Luschka
Arachnoid granulation|60|A projection involved in drainage toward dural venous sinuses.|arachnoid villus~arachnoid villi
Cisterna magna|85|A large CSF cistern behind the medulla.|cerebellomedullary cistern
Lumbar cistern|85|A subarachnoid reservoir below the adult spinal cord.
Interpeduncular cistern|85|A CSF space between the cerebral peduncles.
Pontine cistern|85|A CSF space anterior to the pons.|prepontine cistern
Central canal|85|A small channel through the spinal cord.
Superior sagittal sinus|85|A dural venous channel receiving drainage from arachnoid granulations.
@brainstem-nuclei|Name a nucleus or named neural structure in the human brainstem.|Inside the brainstem|The darkly pigmented dopamine nucleus is an introductory classic.|Substantia nigra
Medullary pyramid|10|A ventral medullary prominence containing corticospinal fibers.|pyramid
Reticular formation|30|A distributed brainstem network involved in arousal and other functions.
Superior colliculus|30|A midbrain structure involved in orienting movements.
Inferior colliculus|30|A major auditory processing center in the midbrain.
Substantia nigra|100|A midbrain nucleus whose pars compacta supplies striatal dopamine.
Red nucleus|60|A midbrain nucleus involved in motor circuitry.|nucleus ruber
Locus coeruleus|60|A pontine nucleus supplying widespread noradrenergic projections.|LC
Raphe nuclei|60|Midline nuclei containing many serotonergic neurons.|raphe
Inferior olive|60|Sends climbing fibers to the cerebellum.|inferior olivary nucleus
Solitary nucleus|60|Receives visceral and taste afferent signals.|nucleus of the solitary tract~NTS
Edinger-Westphal nucleus|85|A source of preganglionic parasympathetic output to the eye.
Dorsal motor nucleus of vagus|85|Contains parasympathetic preganglionic neurons.|dorsal vagal nucleus
Nucleus ambiguus|85|Contains motor neurons for muscles of the pharynx and larynx.
Spinal trigeminal nucleus|85|Processes facial pain and temperature information.
Principal trigeminal nucleus|85|Processes discriminative facial touch.|chief sensory trigeminal nucleus
Pedunculopontine nucleus|85|A pontomesencephalic nucleus involved in movement and arousal.|PPN
@thalamic-nuclei|Name a thalamic nucleus or nuclear group.|The thalamic map|The visual relay is a useful introductory answer.|Lateral geniculate nucleus
Anterior nucleus|10|An anterior thalamic group participating in memory circuitry.|anterior thalamic nuclei
Pulvinar|30|A large posterior thalamic region involved in visual and attention networks.
Medial geniculate nucleus|30|A major auditory relay to cortex.|MGN~medial geniculate body
Ventral posterior nucleus|30|A thalamic relay group for somatosensory information.|VP
Lateral geniculate nucleus|100|Relays retinal signals to primary visual cortex.|LGN~lateral geniculate body
Ventral posterolateral nucleus|60|Relays somatosensory information from the body.|VPL
Ventral posteromedial nucleus|60|Relays facial somatosensation and includes a taste-related subdivision.|VPM
Ventral lateral nucleus|60|Participates in motor circuits with cerebellum and basal ganglia.|VL
Ventral anterior nucleus|60|A motor-related nucleus receiving basal-ganglia output.|VA
Mediodorsal nucleus|60|Connects extensively with prefrontal cortex.|MD~dorsomedial nucleus
Reticular nucleus|85|A GABAergic shell that regulates other thalamic nuclei.|thalamic reticular nucleus~TRN
Centromedian nucleus|85|An intralaminar nucleus projecting strongly to striatum.|CM
Parafascicular nucleus|85|An intralaminar nucleus involved in thalamostriatal signaling.|Pf
Reuniens nucleus|85|A midline nucleus linking prefrontal and hippocampal networks.|nucleus reuniens
Lateral dorsal nucleus|85|A thalamic nucleus associated with limbic cortical connections.|LD
Lateral posterior nucleus|85|An association nucleus posterior to the lateral dorsal nucleus.|LP
@hypothalamic-nuclei|Name a hypothalamic nucleus, region, or fiber bundle.|Homeostatic geography|The circadian clock is an introductory-course gem.|Suprachiasmatic nucleus
Anterior hypothalamic area|10|A hypothalamic region involved in heat-loss and autonomic responses.
Mammillary body|30|A hypothalamic structure participating in memory circuits.|mammillary bodies
Lateral hypothalamus|30|Contains populations involved in feeding and wakefulness.|lateral hypothalamic area
Arcuate nucleus|30|Contains neurons controlling feeding and pituitary regulation.|infundibular nucleus
Suprachiasmatic nucleus|100|A hypothalamic clock synchronized by retinal light input.|SCN
Paraventricular nucleus|60|Contains neuroendocrine and autonomic-regulating neurons.|PVN
Supraoptic nucleus|60|Contains magnocellular neurons producing vasopressin and oxytocin.|SON
Ventromedial nucleus|60|Participates in energy balance and defensive or reproductive behaviors.|VMH
Dorsomedial nucleus|60|Participates in metabolic and circadian regulation.|DMH
Preoptic area|60|A region important for thermoregulation and reproduction.|POA
Ventrolateral preoptic nucleus|85|Contains sleep-promoting neurons.|VLPO
Tuberomammillary nucleus|85|Contains histaminergic wake-promoting neurons.|TMN
Posterior hypothalamic area|85|A region involved in arousal and autonomic control.
Median eminence|85|A neurovascular region delivering releasing hormones to portal blood.
Supraopticohypophyseal tract|85|Carries hypothalamic axons to the posterior pituitary.|hypothalamo-hypophyseal tract
Medial forebrain bundle|85|A fiber system passing through lateral hypothalamus.|MFB
@cortical-landmarks|Name a named gyrus, sulcus, or fissure of the human cerebrum.|Cortical landmarks|The groove separating frontal and parietal lobes is a classic.|Central sulcus
Precentral gyrus|10|Contains primary motor cortex.
Postcentral gyrus|30|Contains primary somatosensory cortex.
Lateral sulcus|30|Separates temporal cortex from overlying frontal and parietal cortex.|Sylvian fissure
Longitudinal fissure|30|Separates the cerebral hemispheres.|interhemispheric fissure
Central sulcus|100|Separates precentral and postcentral gyri.|Rolandic sulcus
Superior temporal gyrus|60|Includes auditory and language-related regions.|STG
Inferior frontal gyrus|60|Includes classical Broca regions in the dominant hemisphere.|IFG
Cingulate gyrus|60|Runs along the medial hemisphere above the corpus callosum.
Fusiform gyrus|60|A ventral temporal-occipital gyrus important in visual recognition.
Calcarine sulcus|60|Primary visual cortex lies along its banks.|calcarine fissure
Parieto-occipital sulcus|85|A medial landmark separating parietal and occipital cortex.
Collateral sulcus|85|Separates parahippocampal and fusiform gyri along much of their course.
Parahippocampal gyrus|85|A medial temporal gyrus containing memory-related cortical areas.
Supramarginal gyrus|85|Curves around the posterior end of the lateral sulcus.
Angular gyrus|85|A posterior inferior parietal gyrus.
Heschl gyrus|85|A transverse temporal gyrus containing primary auditory cortex.|Heschl's gyrus~transverse temporal gyrus
@association-tracts|Name a named cerebral white-matter tract, commissure, or capsule.|Cerebral wiring|The largest bridge between hemispheres belongs in any intro course.|Corpus callosum
Internal capsule|10|Carries major ascending and descending fibers through the cerebrum.
Corona radiata|30|A fan-shaped collection of fibers above the internal capsule.
Fornix|30|A major hippocampal output pathway.
Optic radiation|30|Links the lateral geniculate nucleus to visual cortex.|geniculocalcarine tract
Corpus callosum|100|The largest white-matter commissure between cerebral hemispheres.
Arcuate fasciculus|60|A dorsal association pathway linking temporal and frontal regions.
Cingulum|60|A medial association fiber bundle within the cingulate region.
Anterior commissure|60|Connects portions of the temporal lobes and olfactory regions.
Uncinate fasciculus|60|Links anterior temporal regions with orbitofrontal cortex.
Superior longitudinal fasciculus|60|An association system linking frontal, parietal, and temporal regions.|SLF
Inferior longitudinal fasciculus|85|Connects occipital and temporal regions.|ILF
Inferior fronto-occipital fasciculus|85|A long association tract connecting frontal and posterior cortex.|IFOF
External capsule|85|A white-matter sheet between putamen and claustrum.
Extreme capsule|85|A white-matter sheet between claustrum and insula.
Posterior commissure|85|A commissure involved in pretectal and related connections.
Hippocampal commissure|85|Commissural fibers connecting hippocampal formations.|commissure of the fornix
@spinal-landmarks|Name a structural part or named landmark of the spinal cord.|The spinal cord|The gray region housing somatic motor neurons is the gem.|Ventral horn
Gray matter|10|The central region rich in neuronal somata and synapses.|grey matter
White matter|30|Peripheral cord tissue containing many myelinated axons.
Central canal|30|A narrow channel at the center of the cord.
Dorsal horn|30|Receives and processes sensory inputs.|posterior horn
Ventral horn|100|Contains somatic lower motor neurons.|anterior horn
Lateral horn|60|Contains autonomic preganglionic neurons at relevant cord levels.
Dorsal column|60|Carries ascending discriminative touch and proprioceptive signals.|posterior column
Anterior median fissure|60|A deep groove on the ventral midline.
Posterior median sulcus|60|A shallow groove on the dorsal midline.
Conus medullaris|60|The tapered inferior end of the adult spinal cord.
Clarke column|85|A spinal nucleus giving rise to dorsal spinocerebellar projections.|nucleus dorsalis~Clarke's column
Substantia gelatinosa|85|Superficial dorsal horn tissue involved in sensory processing.|Rexed lamina II
Anterior white commissure|85|A crossing site for many ascending pain-temperature axons.
Fasciculus gracilis|85|The medial dorsal column carrying lower-body information.|gracile fasciculus
Fasciculus cuneatus|85|The lateral dorsal column carrying upper-body information.|cuneate fasciculus
Lissauer tract|85|A dorsolateral tract carrying short ascending and descending sensory branches.|dorsolateral fasciculus
@peripheral-anatomy|Name a connective-tissue covering, structure, or neural cell in a peripheral nerve or ganglion.|Peripheral nerve anatomy|One Schwann cell makes one myelinated internode.|Schwann cell
Axon|10|A neuronal projection carrying electrical signals.
Myelin|30|A multilayered insulating membrane around some peripheral axons.|myelin sheath
Nerve fascicle|30|A bundle of nerve fibers enclosed by perineurium.|fascicle
Ganglion|30|A collection of peripheral neuronal cell bodies.
Schwann cell|100|The glial cell that myelinates peripheral axons.|neurolemmocyte
Endoneurium|60|Delicate connective tissue surrounding individual nerve fibers.
Perineurium|60|A barrier-forming sheath around a nerve fascicle.
Epineurium|60|The outer connective-tissue covering of a peripheral nerve.
Node of Ranvier|60|A gap between adjacent myelin internodes.|Ranvier node
Satellite glial cell|60|A glial cell surrounding neuronal somata in ganglia.|satellite cell
Remak bundle|85|A group of unmyelinated axons ensheathed by a nonmyelinating Schwann cell.
Mesaxon|85|The double-membrane connection where Schwann-cell membrane wraps an axon.
Internode|85|A myelinated axonal segment between nodes.
Paranode|85|The specialized axon-myelin junction next to a node.
Vasa nervorum|85|Small blood vessels supplying peripheral nerves.
Schmidt-Lanterman incisure|85|A cytoplasmic channel through peripheral myelin.|Schmidt Lanterman cleft
@limb-nerves|Name a major named nerve of the human upper or lower limb.|Peripheral nerve map|The nerve compressed in carpal tunnel is a classic.|Median nerve
Sciatic nerve|10|A large nerve supplying much of the lower limb.|sciatic
Ulnar nerve|30|Supplies many intrinsic hand muscles and medial hand sensation.|ulnar
Radial nerve|30|Supplies major upper-limb extensor muscles.|radial
Femoral nerve|30|Supplies quadriceps and anterior-thigh sensation.|femoral
Median nerve|100|Passes through the carpal tunnel and supplies thenar muscles.|median
Axillary nerve|60|Supplies deltoid and teres minor.|axillary
Musculocutaneous nerve|60|Supplies anterior arm flexors.|musculocutaneous
Obturator nerve|60|Supplies major medial-thigh adductors.|obturator
Tibial nerve|60|Supplies posterior leg and plantar-foot muscles.|tibial
Common fibular nerve|60|Divides into superficial and deep fibular nerves.|common peroneal nerve
Long thoracic nerve|85|Supplies serratus anterior.
Suprascapular nerve|85|Supplies supraspinatus and infraspinatus.
Superior gluteal nerve|85|Supplies gluteus medius, gluteus minimus, and tensor fasciae latae.
Inferior gluteal nerve|85|Supplies gluteus maximus.
Saphenous nerve|85|A sensory branch of the femoral nerve.
Sural nerve|85|A sensory nerve serving the posterolateral distal leg and lateral foot.
@brain-arteries|Name an artery supplying the brain or spinal cord.|Neural blood supply|The artery supplying much of the lateral cerebral surface is the gem.|Middle cerebral artery
Internal carotid artery|10|A major inflow vessel for the anterior cerebral circulation.|ICA
Vertebral artery|30|A paired artery joining to form the basilar artery.
Basilar artery|30|Runs along the ventral pons and supplies posterior circulation.
Anterior cerebral artery|30|Supplies much of the medial frontal and parietal cortex.|ACA
Middle cerebral artery|100|Supplies much of the lateral cerebral cortex.|MCA
Posterior cerebral artery|60|Supplies occipital and inferomedial temporal regions.|PCA
Anterior communicating artery|60|Connects the anterior cerebral arteries.|ACom
Posterior communicating artery|60|Links carotid and posterior cerebral circulations.|PCom
Anterior inferior cerebellar artery|60|Supplies portions of cerebellum and lateral pons.|AICA
Posterior inferior cerebellar artery|60|Supplies inferior cerebellum and parts of medulla.|PICA
Superior cerebellar artery|85|Supplies superior cerebellum and adjacent brainstem.|SCA
Anterior choroidal artery|85|Supplies structures including parts of the internal capsule.
Lenticulostriate artery|85|A penetrating arterial branch supplying deep cerebral structures.|lenticulostriate arteries
Recurrent artery of Heubner|85|An ACA branch supplying portions of caudate and internal capsule.|Heubner artery
Anterior spinal artery|85|Supplies much of the anterior spinal cord.
Posterior spinal artery|85|Supplies posterior regions of the spinal cord.
@brain-veins|Name a vein or dural venous sinus that drains the brain.|Cerebral drainage|A large sinus runs beneath the top midline of the skull.|Superior sagittal sinus
Jugular vein|10|The internal jugular vein receives major intracranial venous drainage.|internal jugular vein
Cavernous sinus|30|A paired sinus lateral to the pituitary.
Transverse sinus|30|A posterior dural channel leading toward the sigmoid sinus.
Sigmoid sinus|30|An S-shaped dural sinus leading to the jugular bulb.
Superior sagittal sinus|100|Runs along the superior margin of the falx cerebri.
Inferior sagittal sinus|60|Runs along the free inferior edge of the falx.
Straight sinus|60|Receives the great cerebral vein and inferior sagittal sinus.
Great cerebral vein|60|A deep midline vein draining into the straight sinus.|vein of Galen
Internal cerebral vein|60|A paired deep cerebral vein.
Basal vein|60|Drains deep and basal brain regions.|basal vein of Rosenthal
Superior petrosal sinus|85|Connects cavernous drainage toward the transverse-sigmoid junction.
Inferior petrosal sinus|85|Drains the cavernous sinus toward the internal jugular vein.
Occipital sinus|85|A dural sinus along the attached falx cerebelli.
Superficial middle cerebral vein|85|A surface vein along the lateral sulcus.|superficial Sylvian vein
Superior anastomotic vein|85|Connects superficial cerebral venous drainage with the superior sagittal sinus.|vein of Trolard
Inferior anastomotic vein|85|Connects superficial middle cerebral drainage with the transverse sinus.|vein of Labbe~vein of Labbé
@basal-ganglia-circuit|Name a named structure, subdivision, or pathway of basal-ganglia circuitry.|Action selection circuits|The input region formed by caudate and putamen is the gem.|Striatum
Caudate nucleus|10|A major component of dorsal striatum.|caudate
Putamen|30|A dorsal striatal structure receiving cortical input.
Globus pallidus|30|A basal-ganglia structure with internal and external segments.
Substantia nigra|30|A midbrain structure with compact and reticular subdivisions.
Striatum|100|A major basal-ganglia input region that includes caudate and putamen.
Subthalamic nucleus|60|A glutamatergic nucleus in basal-ganglia motor loops.|STN
Nucleus accumbens|60|A major component of ventral striatum.
Direct pathway|60|A striatal route that inhibits basal-ganglia output nuclei.
Indirect pathway|60|A striatal route through external pallidum and subthalamic nucleus.
Hyperdirect pathway|60|A cortical route reaching the subthalamic nucleus directly.
Globus pallidus internus|85|An inhibitory output nucleus of basal ganglia.|GPi~internal globus pallidus
Globus pallidus externus|85|A pallidal region central to indirect-pathway circuitry.|GPe~external globus pallidus
Substantia nigra pars compacta|85|Contains dopaminergic neurons projecting to striatum.|SNc
Substantia nigra pars reticulata|85|An inhibitory output region of basal ganglia.|SNr
Ventral pallidum|85|A major output region of ventral basal-ganglia circuits.
Striosome|85|A neurochemically distinct compartment within striatum.|patch compartment
@hippocampal-map|Name a structure, subfield, or named pathway of the hippocampal formation.|The hippocampal circuit|The granule-cell region is the introductory gem.|Dentate gyrus
Hippocampus|10|A medial temporal structure important for episodic and spatial memory.
Fornix|30|A major output pathway of the hippocampal formation.
Entorhinal cortex|30|A major cortical interface with the hippocampus.|EC
CA1|30|A hippocampal subfield receiving Schaffer collateral input.|cornu ammonis 1
Dentate gyrus|100|A granule-cell region receiving perforant-path input.|DG
CA3|60|A hippocampal subfield with prominent recurrent collaterals.|cornu ammonis 3
CA2|60|A small hippocampal subfield between CA3 and CA1.|cornu ammonis 2
Subiculum|60|A major hippocampal output region.
Perforant path|60|Carries entorhinal input to hippocampal regions.
Schaffer collateral|60|A CA3 axon branch projecting to CA1.|Schaffer collaterals
Mossy fiber|85|A dentate granule-cell axon projecting to CA3.|mossy fibers
Stratum pyramidale|85|The layer containing hippocampal pyramidal-cell somata.|pyramidal cell layer
Stratum radiatum|85|A dendritic layer receiving many Schaffer collateral synapses.
Stratum oriens|85|A layer basal to hippocampal pyramidal-cell bodies.
Stratum lacunosum-moleculare|85|A distal dendritic layer receiving entorhinal input.|SLM
Alveus|85|A thin white-matter sheet over the ventricular hippocampal surface.
@cerebellar-circuit|Name a named input, output, cell, or synaptic pathway of cerebellar circuitry.|Cerebellar connections|The inhibitory output neuron of cerebellar cortex is the gem.|Purkinje cell
Cerebellum|10|A hindbrain structure central to coordination and motor learning.
Granule cell|30|An excitatory cerebellar neuron whose axon forms parallel fibers.
Mossy fiber|30|A major cerebellar afferent contacting granule cells.|mossy fibers
Climbing fiber|30|An inferior-olive afferent making powerful contacts onto Purkinje cells.|climbing fibers
Purkinje cell|100|The inhibitory output neuron of cerebellar cortex.|Purkinje neuron
Parallel fiber|60|A granule-cell axon branch contacting Purkinje dendrites.|parallel fibers
Basket cell|60|An inhibitory interneuron targeting Purkinje somatic regions.
Stellate cell|60|An inhibitory interneuron in the molecular layer.
Golgi cell|60|An inhibitory interneuron regulating granule cells.
Dentate nucleus|60|The largest lateral deep cerebellar nucleus.
Fastigial nucleus|85|A medial deep nucleus linked to posture and eye-movement circuits.
Interposed nuclei|85|Deep nuclei comprising emboliform and globose nuclei.|interpositus nucleus
Superior cerebellar peduncle|85|Carries much of the output from deep cerebellar nuclei.
Middle cerebellar peduncle|85|Carries pontocerebellar afferents.
Inferior cerebellar peduncle|85|Carries several spinal, olivary, and vestibular connections.
Unipolar brush cell|85|An excitatory interneuron enriched in vestibulocerebellar regions.|UBC
@smell-route|Name a cell, structure, or named pathway in mammalian olfaction.|From odor to brain|The first large brain relay for smell is the gem.|Olfactory bulb
Nose|10|The organ housing the olfactory epithelium.
Olfactory epithelium|30|Contains olfactory sensory neurons in the nasal cavity.
Olfactory receptor neuron|30|A sensory neuron expressing odorant receptors.|olfactory sensory neuron~OSN
Olfactory nerve|30|Bundles of sensory axons passing toward the olfactory bulb.|CN I
Olfactory bulb|100|A forebrain structure receiving direct olfactory sensory input.
Olfactory glomerulus|60|A bulb compartment where sensory axons contact projection neurons.|glomerulus
Mitral cell|60|A principal olfactory-bulb output neuron.
Tufted cell|60|An excitatory olfactory-bulb projection neuron.
Piriform cortex|60|A major primary olfactory cortical area.
Olfactory tract|60|Carries bulb output toward olfactory cortical regions.
Periglomerular cell|85|A local interneuron surrounding olfactory glomeruli.
Olfactory granule cell|85|An axonless inhibitory bulb interneuron.|granule cell
Anterior olfactory nucleus|85|An olfactory region connecting bulb and cortical networks.|AON
Olfactory tubercle|85|A ventral forebrain olfactory and reward-related structure.
Lateral olfactory tract|85|A major lateral output bundle from the olfactory bulb.|LOT
Sustentacular cell|85|A supporting epithelial cell in olfactory tissue.|supporting cell
@taste-system|Name a structure, cell category, or cranial nerve carrying taste signals.|Taste pathways|A tongue taste bud is a good introductory answer.|Taste bud
Tongue|10|Contains most oral taste buds.
Gustatory cortex|30|Insular and opercular cortex involved in taste processing.|taste cortex
Facial nerve|30|Carries taste afferents from the anterior tongue.|CN VII
Glossopharyngeal nerve|30|Carries taste afferents from the posterior tongue.|CN IX
Taste bud|100|A cluster of specialized epithelial sensory and supporting cells.
Vagus nerve|60|Carries taste signals from parts of the epiglottic region.|CN X
Solitary nucleus|60|A first central relay for taste afferents.|nucleus of the solitary tract~NTS
Fungiform papilla|60|A tongue papilla type that contains taste buds.|fungiform papillae
Foliate papilla|60|A folded lateral tongue papilla type containing taste buds.|foliate papillae
Circumvallate papilla|60|A large posterior tongue papilla type with taste buds.|vallate papilla~circumvallate papillae
Geniculate ganglion|85|Contains facial-nerve sensory cell bodies, including taste afferents.
Petrosal ganglion|85|Contains glossopharyngeal sensory cell bodies.|inferior glossopharyngeal ganglion
Nodose ganglion|85|Contains many vagal visceral sensory cell bodies.|inferior vagal ganglion
Type II taste cell|85|A receptor-cell category detecting sweet, bitter, or umami tastants.|type 2 taste cell
Type III taste cell|85|A presynaptic taste-cell category important in sour transduction.|type 3 taste cell
Ventral posteromedial nucleus|85|Its parvicellular region relays taste information to cortex.|VPMpc~VPM
@vestibular-map|Name a structure or cell in the vestibular system.|Balance and head movement|The semicircular canals detect head rotation.|Semicircular canal
Inner ear|10|Houses vestibular organs as well as the cochlea.
Vestibular hair cell|30|Converts motion-related mechanical deflection into receptor signals.|hair cell
Utricle|30|An otolith organ sensitive to linear acceleration and head tilt.
Saccule|30|An otolith organ with a differently oriented sensory macula.
Semicircular canal|100|A curved labyrinth structure specialized for angular head motion.|semicircular canals
Cupula|60|A gelatinous structure displaced by fluid motion in a canal ampulla.
Otolith|60|A calcium-carbonate crystal adding mass to the otolith membrane.|otoconia~otoconium
Vestibular nerve|60|Carries vestibular afferent signals toward the brainstem.
Vestibular ganglion|60|Contains primary vestibular sensory neuron somata.|Scarpa ganglion
Vestibular nucleus|60|A brainstem relay for vestibular signals.|vestibular nuclei
Crista ampullaris|85|The sensory epithelium within a semicircular-canal ampulla.|crista
Macula|85|The sensory epithelium of an otolith organ.|otolith macula
Kinocilium|85|A hair-cell cilium that establishes bundle polarity.
Endolymph|85|The fluid inside the membranous labyrinth.
Flocculus|85|A cerebellar region important for vestibulo-ocular adaptation.
Medial longitudinal fasciculus|85|Links vestibular and eye-movement nuclei.|MLF
@ear-mechanics|Name an anatomical structure involved in transmitting sound or cochlear transduction.|The hearing apparatus|The coiled inner-ear organ is an intro classic.|Cochlea
Tympanic membrane|10|Vibrates in response to sound pressure.|eardrum
Malleus|30|An ossicle attached to the tympanic membrane.|hammer
Incus|30|The middle ossicle linking malleus and stapes.|anvil
Stapes|30|An ossicle whose footplate moves at the oval window.|stirrup
Cochlea|100|The coiled inner-ear organ that analyzes sound frequencies.
Oval window|60|Receives mechanical input from the stapes.
Round window|60|A flexible membrane allowing cochlear fluid displacement.
Basilar membrane|60|A cochlear partition whose mechanics support frequency selectivity.
Organ of Corti|60|The sensory epithelium containing cochlear hair cells.
Inner hair cell|60|Provides most afferent signals to the auditory nerve.|IHC
Outer hair cell|85|Amplifies cochlear motion through electromotility.|OHC
Tectorial membrane|85|An extracellular structure interacting with cochlear hair bundles.
Stria vascularis|85|Helps maintain potassium-rich endolymph and the endocochlear potential.
Scala vestibuli|85|A perilymph-filled cochlear chamber above the cochlear duct.
Scala tympani|85|A perilymph-filled cochlear chamber below the basilar membrane.
Spiral ganglion|85|Contains the somata of primary auditory afferent neurons.
@eye-anatomy|Name an anatomical structure of the human eye.|The eye|The aperture controlled by the iris is the gem.|Pupil
Retina|10|The neural tissue lining the back of the eye.
Cornea|30|The transparent anterior surface providing much of the eye's refraction.
Lens|30|A transparent structure that changes shape during accommodation.
Iris|30|A pigmented structure controlling pupil diameter.
Pupil|100|The opening through which light enters the eye.
Fovea|60|A central retinal specialization supporting high acuity.|fovea centralis
Optic disc|60|The axonal exit point lacking photoreceptors.|blind spot
Sclera|60|The tough outer coat of the eye.
Choroid|60|A vascular layer between retina and sclera.
Ciliary muscle|60|Changes lens tension during accommodation.
Zonular fiber|85|A suspensory fiber attaching the lens to the ciliary body.|zonule~suspensory ligament of lens
Trabecular meshwork|85|A major outflow route for aqueous humor.
Canal of Schlemm|85|Collects aqueous humor from the trabecular outflow route.|Schlemm canal
Vitreous body|85|A transparent gel occupying the posterior eye.|vitreous humor
Anterior chamber|85|The aqueous-filled space between cornea and iris.
Macula lutea|85|The central retinal region containing the fovea.|macula
@visual-features|Name a stimulus property that neurons in the visual system can encode selectively.|Visual coding|Edge orientation is a classic property of V1 neurons.|Orientation
Color|10|Differences in wavelength composition can drive selective visual responses.|colour
Brightness|30|Perceived light intensity, related to luminance and context.
Motion direction|30|Some neurons prefer motion in a particular direction.|direction of motion
Spatial location|30|Receptive fields restrict responses to particular visual positions.|position
Orientation|100|Many visual cortical neurons prefer edges at particular angles.|edge orientation
Spatial frequency|60|The rate at which a pattern varies across visual space.
Temporal frequency|60|The rate of repetitive luminance change over time.
Binocular disparity|60|A difference between the two retinal images used for depth.
Contrast|60|A difference in luminance or color relative to a reference.
Motion speed|60|Some neurons prefer particular stimulus velocities.|speed
Spatial phase|85|The placement of light and dark regions within a periodic pattern.|phase
Curvature|85|Some higher visual neurons distinguish curved contour features.
Object identity|85|Ventral visual populations carry information about object category and identity.
Face identity|85|Some temporal populations distinguish identities within faces.
Expansion|85|A radial optic-flow pattern signaling approach or observer motion.|looming
Rotation|85|A rotational optic-flow pattern represented in motion-sensitive networks.
@phototransduction|Name a molecule, protein, or ion directly involved in vertebrate phototransduction or visual-pigment recycling.|Light into electricity|The light-sensitive rod pigment is an introductory classic.|Rhodopsin
Potassium|10|Outward potassium current contributes to photoreceptor membrane voltage.|K+
Retinal|30|The light-sensitive chromophore bound to visual opsins.|retinaldehyde
Opsin|30|A photopigment protein that binds retinal.
Sodium|30|Flows through open outer-segment cyclic-nucleotide-gated channels.|Na+
Rhodopsin|100|The visual pigment in rod photoreceptors.
Transducin|60|A G protein activated by photoexcited visual pigment.|Gt
Cyclic GMP|60|The nucleotide that opens outer-segment CNG channels.|cGMP
Phosphodiesterase 6|60|Hydrolyzes cGMP after activation by transducin.|PDE6
CNG channel|60|An outer-segment channel gated by cyclic nucleotides.|cyclic nucleotide-gated channel
Calcium|60|Provides feedback signals that influence photoreceptor adaptation.|Ca2+
Guanylyl cyclase|85|Resynthesizes cGMP during recovery and adaptation.|retinal guanylate cyclase
Recoverin|85|A calcium-binding regulator of rhodopsin kinase.
Arrestin|85|Binds phosphorylated activated rhodopsin to terminate signaling.|visual arrestin
Rhodopsin kinase|85|Phosphorylates activated rhodopsin.|GRK1
RPE65|85|An isomerase essential to the classical retinal visual cycle.
Retinol dehydrogenase|85|An enzyme family participating in retinoid interconversion.|RDH
@sensory-proteins|Name a receptor, channel, or transduction protein used by peripheral sensory cells.|Sensory transducers|The heat-and-capsaicin channel is a memorable intro answer.|TRPV1|sensory
Rhodopsin|10|The light-sensitive pigment in rod photoreceptors.
Odorant receptor|30|A receptor family detecting odor molecules.|olfactory receptor
Taste receptor|30|A receptor protein detecting a tastant.
Mechanosensitive ion channel|30|An ion channel gated by mechanical forces.|mechanically gated channel
TRPV1|100|A channel activated by capsaicin, heat, and other stimuli.|capsaicin receptor
TRPM8|60|A channel activated by cooling and menthol.|menthol receptor
Piezo2|60|A mechanically gated channel important in touch and proprioception.|PIEZO2
T1R2-T1R3|60|A receptor heterodimer detecting many sweet compounds.|T1R2/T1R3~sweet taste receptor
T1R1-T1R3|60|A receptor heterodimer important in umami detection.|T1R1/T1R3~umami receptor
T2R|60|A family of bitter taste receptors.|bitter taste receptor~TAS2R
TMC1|85|A protein central to hair-cell mechanotransduction channels.
Tip link|85|A hair-bundle linkage transmitting force to the transduction apparatus.|tip links
Cadherin 23|85|A constituent of hair-cell tip links.|CDH23
Protocadherin 15|85|A constituent of hair-cell tip links.|PCDH15
ASIC|85|An acid-sensing ion-channel family expressed in sensory neurons.|acid-sensing ion channel
OTOP1|85|A proton channel involved in sour taste transduction.|otopetrin 1
@touch-route|Name a structure carrying or relaying discriminative touch or proprioceptive signals from the body.|Touch and position pathways|The sensory-neuron ganglion beside the spinal cord is the gem.|Dorsal root ganglion
Spinal nerve|10|Carries mixed sensory and motor axons.
Dorsal root|30|Carries sensory afferents into the spinal cord.|posterior root
Thalamus|30|Contains relays for body somatosensory signals.
Primary somatosensory cortex|30|Receives major thalamic somatosensory input.|S1
Dorsal root ganglion|100|Contains primary body sensory-neuron cell bodies.|DRG
Fasciculus gracilis|60|Ascends with discriminative lower-body signals.|gracile fasciculus
Fasciculus cuneatus|60|Ascends with discriminative upper-body signals.|cuneate fasciculus
Gracile nucleus|60|A medullary relay for lower-body dorsal-column input.|nucleus gracilis
Cuneate nucleus|60|A medullary relay for upper-body dorsal-column input.|nucleus cuneatus
Medial lemniscus|60|Carries crossed brainstem somatosensory projections toward thalamus.
Internal arcuate fibers|85|Crossing axons from dorsal-column nuclei forming the medial lemniscus.
Ventral posterolateral nucleus|85|A thalamic relay for body somatosensation.|VPL
Posterior limb of internal capsule|85|Carries somatosensory thalamocortical fibers.
Area 3a|85|An S1 subdivision with strong proprioceptive responses.|Brodmann area 3a
Area 3b|85|An S1 subdivision receiving strong cutaneous input.|Brodmann area 3b
Secondary somatosensory cortex|85|A cortical region involved in higher somatosensory processing.|S2
@nociception-molecules|Name a molecule or receptor involved in nociceptive or analgesic signaling.|Pain signaling chemistry|A spinal neuropeptide from introductory pain lectures is the gem.|Substance P
Glutamate|10|A major excitatory transmitter in nociceptive pathways.
GABA|30|An inhibitory transmitter that modulates nociceptive circuits.
Endorphin|30|An endogenous opioid peptide with analgesic actions.|endorphins~beta-endorphin
Morphine|30|An opioid agonist that can reduce pain signaling.
Substance P|100|A neuropeptide released by subsets of primary nociceptive afferents.
CGRP|60|A sensory neuropeptide involved in nociception and migraine biology.|calcitonin gene-related peptide
Enkephalin|60|An endogenous opioid peptide acting in pain-modulating circuits.|enkephalins
Bradykinin|60|An inflammatory mediator that excites or sensitizes nociceptors.
Prostaglandin E2|60|An inflammatory lipid mediator that can sensitize nociceptors.|PGE2
TRPV1|60|A channel activated by capsaicin and noxious heat.
Nav1.7|85|A sodium-channel subtype important in human pain signaling.|SCN9A
Nav1.8|85|A sodium-channel subtype prominent in nociceptors.|SCN10A
P2X3|85|An ATP-gated receptor expressed by sensory neurons.
Mu opioid receptor|85|An opioid receptor central to many analgesic effects.|MOR~OPRM1
Neurokinin 1 receptor|85|A receptor activated by substance P.|NK1 receptor
Nerve growth factor|85|A trophic signal that also sensitizes nociceptive neurons.|NGF
@pain-networks|Name a structure or tract participating in nociceptive processing or descending pain modulation.|Pain pathways|A descending-control hub surrounds the midbrain aqueduct.|Periaqueductal gray
Spinal cord|10|Contains dorsal-horn nociceptive processing circuits.
Thalamus|30|Relays and processes ascending nociceptive information.
Insula|30|Contributes to sensory and affective aspects of pain.
Anterior cingulate cortex|30|Contributes to affective and motivational aspects of pain.|ACC
Periaqueductal gray|100|A midbrain hub for descending pain modulation.|PAG~periaqueductal grey
Spinothalamic tract|60|An ascending pathway carrying pain and temperature information.
Dorsal horn|60|The spinal region receiving primary nociceptive afferents.
Substantia gelatinosa|60|A superficial dorsal-horn region important in nociceptive processing.
Rostral ventromedial medulla|60|A descending pain-modulating brainstem region.|RVM
Locus coeruleus|60|A source of descending noradrenergic modulation.
Parabrachial nucleus|85|Relays nociceptive and visceral signals to forebrain structures.
Spinoreticular tract|85|An ascending pathway linking spinal nociceptive circuits to reticular formation.
Spinomesencephalic tract|85|An ascending pathway reaching midbrain pain-related structures.
Lamina I|85|A superficial dorsal-horn layer containing nociceptive projection neurons.|Rexed lamina I
Lamina V|85|A deeper dorsal-horn layer containing wide-dynamic-range neurons.|Rexed lamina V
Nucleus raphe magnus|85|A medullary nucleus involved in descending nociceptive modulation.
@neuromuscular-junction|Name a cell, molecule, or structure at the vertebrate neuromuscular junction.|Nerve meets muscle|The enzyme that terminates the acetylcholine signal is the gem.|Acetylcholinesterase
Motor neuron|10|A neuron whose axon activates skeletal muscle fibers.
Muscle fiber|30|A skeletal-muscle cell contacted by a motor axon.
Acetylcholine|30|The transmitter released by skeletal-muscle motor neurons.|ACh
Nicotinic receptor|30|A ligand-gated channel on the muscle endplate.|nicotinic acetylcholine receptor~nAChR
Acetylcholinesterase|100|Breaks down acetylcholine in the synaptic cleft.|AChE
Motor endplate|60|The specialized postsynaptic region of a muscle fiber.|end plate
Synaptic vesicle|60|Stores acetylcholine before release.
Active zone|60|A presynaptic specialization where transmitter vesicles fuse.
Junctional fold|60|A muscle membrane fold that increases postsynaptic surface area.|junctional folds
Terminal Schwann cell|60|A glial cell covering the motor nerve terminal.|perisynaptic Schwann cell
Agrin|85|A nerve-derived organizer of postsynaptic differentiation.
MuSK|85|A receptor tyrosine kinase required for endplate organization.|muscle-specific kinase
LRP4|85|A coreceptor participating in agrin-MuSK signaling.
Rapsyn|85|A scaffold that clusters nicotinic acetylcholine receptors.
Synaptotagmin|85|A calcium sensor involved in synaptic vesicle fusion.
Voltage-gated calcium channel|85|Lets presynaptic calcium enter during an arriving action potential.|VGCC
@muscle-activation|Name a protein, ion, or structure involved in skeletal-muscle excitation-contraction coupling or contraction.|From spike to force|The calcium-binding regulatory protein is the gem.|Troponin
Actin|10|Forms the thin filaments of skeletal muscle.
Myosin|30|A motor protein forming thick filaments.
Calcium|30|Binds troponin to enable actin-myosin interaction.|Ca2+
ATP|30|Provides energy for cross-bridge cycling and ion pumping.
Troponin|100|A thin-filament protein complex whose calcium binding regulates contraction.
Tropomyosin|60|A filamentous protein that helps block myosin-binding sites at rest.
Sarcoplasmic reticulum|60|An intracellular calcium store in muscle.|SR
T tubule|60|An invagination carrying electrical signals into the muscle fiber.|transverse tubule
Sarcomere|60|The repeating contractile unit between Z discs.
Ryanodine receptor|60|An SR calcium-release channel.|RyR1
Dihydropyridine receptor|85|A voltage sensor coupled to SR calcium release in skeletal muscle.|DHPR~CaV1.1
SERCA|85|An ATPase returning cytoplasmic calcium to the SR.|sarcoplasmic reticulum calcium ATPase
Titin|85|A giant protein contributing passive elasticity and sarcomere organization.
Nebulin|85|A large thin-filament-associated protein in skeletal muscle.
Calsequestrin|85|An SR calcium-binding storage protein.
Triad|85|A T tubule flanked by two terminal SR cisternae.
@eye-movements|Name a recognized eye movement, gaze reflex, or eye-movement control structure.|Gaze control|The reflex stabilizing your gaze during head movement is the gem.|Vestibulo-ocular reflex
Saccade|10|A rapid movement shifting the line of sight.
Smooth pursuit|30|A tracking movement following a moving target.|pursuit
Vergence|30|Opposite-direction eye rotations used for changing viewing distance.
Superior colliculus|30|A midbrain structure contributing to orienting and saccades.
Vestibulo-ocular reflex|100|Compensatory eye movements stabilize gaze during head motion.|VOR
Optokinetic response|60|Eye movements driven by large-field visual motion.|optokinetic reflex~OKR
Convergence|60|Inward rotation of the two eyes for near viewing.
Divergence|60|Outward vergence rotation for more distant viewing.
Frontal eye field|60|A cortical region involved in voluntary saccade control.|FEF
Oculomotor nucleus|60|Contains motor neurons for most extraocular muscles.
Paramedian pontine reticular formation|85|A premotor region important for horizontal saccades.|PPRF
Rostral interstitial nucleus of MLF|85|A premotor region important for vertical saccades.|riMLF
Abducens nucleus|85|Contains lateral-rectus motor neurons and internuclear neurons.
Interstitial nucleus of Cajal|85|Contributes to vertical and torsional gaze holding.
Nucleus prepositus hypoglossi|85|Contributes to horizontal gaze holding.
Omnipause neuron|85|A brainstem neuron that pauses during saccades.|omnipause neurons
@motor-signs|Name a recognized abnormal motor sign or involuntary movement.|Describing movement|A velocity-dependent increase in stretch resistance is the gem.|Spasticity
Tremor|10|An involuntary rhythmic oscillation of a body part.
Weakness|30|Reduced capacity to generate voluntary force.|paresis
Paralysis|30|Loss of voluntary movement.|plegia
Ataxia|30|Impaired coordination of movement.
Spasticity|100|A velocity-dependent increase in stretch-reflex resistance.
Rigidity|60|Increased resistance to passive movement that is less velocity dependent.
Bradykinesia|60|Slowness of movement with reduced movement amplitude or speed.
Dystonia|60|Sustained or intermittent contractions causing abnormal postures or movements.
Chorea|60|Brief, irregular, flowing involuntary movements.
Myoclonus|60|Sudden brief involuntary muscle jerks.
Ballismus|85|Large-amplitude flinging involuntary movements.
Athetosis|85|Slow writhing involuntary movement.
Fasciculation|85|Visible contraction of a motor unit or part of one.
Clonus|85|Repetitive contractions evoked by sustained stretch.
Dysmetria|85|Inaccurate movement amplitude, such as overshooting a target.
Dysdiadochokinesia|85|Impaired rapid alternating movements.
@sensory-signs|Name a recognized sensory symptom or abnormal sensory sign.|Describing sensation|Pain from a normally nonpainful stimulus is the gem.|Allodynia
Numbness|10|A subjective sense of reduced or absent sensation.
Paresthesia|30|An abnormal sensation such as tingling.|paraesthesia~pins and needles
Anesthesia|30|Absence of sensation in a region.|anaesthesia
Hypoesthesia|30|Reduced sensitivity to stimulation.|hypoaesthesia
Allodynia|100|Pain caused by a stimulus that does not normally provoke pain.
Hyperalgesia|60|Increased pain from a normally painful stimulus.
Hypoalgesia|60|Diminished pain in response to a painful stimulus.
Dysesthesia|60|An unpleasant abnormal sensation.|dysaesthesia
Analgesia|60|Absence of pain in response to a normally painful stimulus.
Astereognosis|60|Impaired identification of objects by touch despite adequate basic sensation.
Agraphesthesia|85|Impaired recognition of symbols traced on the skin.|agraphesthaesia
Sensory extinction|85|Failure to report one stimulus during simultaneous bilateral stimulation.
Hyperesthesia|85|Increased sensitivity to stimulation.|hyperaesthesia
Loss of proprioception|85|Impaired awareness of joint or limb position.|proprioceptive loss
Loss of vibration sense|85|Reduced ability to perceive vibration.|pallhypesthesia
Thermal hypoesthesia|85|Reduced ability to detect temperature changes.|reduced temperature sensation
@release-proteins|Name a protein involved in presynaptic vesicle docking, fusion, or recycling.|Presynaptic machinery|The calcium sensor for fast release is an intro-level gem.|Synaptotagmin
SNARE|10|A family of membrane-fusion proteins.|SNARE protein
Synaptobrevin|30|A vesicle SNARE that participates in fusion.|VAMP2
Syntaxin|30|A plasma-membrane SNARE involved in exocytosis.|syntaxin 1
SNAP-25|30|A neuronal plasma-membrane SNARE protein.|SNAP25
Synaptotagmin|100|A vesicle-associated calcium sensor for rapid release.|synaptotagmin 1
Complexin|60|A regulator binding assembled SNARE complexes.
Munc13|60|A protein family essential for synaptic vesicle priming.
Munc18|60|A syntaxin-binding protein important for membrane fusion.|STXBP1
Clathrin|60|A coat protein in a major endocytic pathway.
Dynamin|60|A GTPase involved in membrane fission during endocytosis.
Rab3|85|A vesicle-associated small GTPase regulating release.
RIM|85|An active-zone scaffold coordinating release machinery.
RIM-binding protein|85|An active-zone protein linking calcium channels and scaffolds.|RIM-BP
Bassoon|85|A large presynaptic active-zone scaffold.
Piccolo|85|A large presynaptic scaffold associated with vesicle organization.
Endophilin|85|A membrane-shaping protein participating in synaptic endocytosis.
@transmitter-transporters|Name a transporter moving neurotransmitters into vesicles or clearing them from extracellular space.|Transporting transmitters|The serotonin uptake transporter is an introductory classic.|Serotonin transporter
Dopamine transporter|10|Clears extracellular dopamine into presynaptic cells.|DAT
Norepinephrine transporter|30|Clears norepinephrine from extracellular space.|NET~noradrenaline transporter
Glutamate transporter|30|A transporter family clearing extracellular glutamate.|EAAT
GABA transporter|30|A transporter family clearing extracellular GABA.|GAT
Serotonin transporter|100|Clears serotonin and is inhibited by SSRIs.|SERT~5HTT~5-HT transporter
Vesicular monoamine transporter 2|60|Loads monoamines into synaptic vesicles.|VMAT2
Vesicular acetylcholine transporter|60|Loads acetylcholine into vesicles.|VAChT
Vesicular glutamate transporter 1|60|Loads glutamate into vesicles in many forebrain neurons.|VGLUT1
Vesicular inhibitory amino acid transporter|60|Loads GABA and glycine into vesicles.|VGAT~VIAAT
Glycine transporter 1|60|Regulates extracellular glycine, prominently in glial cells.|GlyT1
Glycine transporter 2|85|Supplies glycine to glycinergic presynaptic terminals.|GlyT2
Vesicular glutamate transporter 2|85|A vesicular glutamate transporter prominent in many subcortical pathways.|VGLUT2
Vesicular glutamate transporter 3|85|A vesicular glutamate transporter expressed by selected neuron populations.|VGLUT3
Excitatory amino acid transporter 1|85|A glial glutamate transporter.|EAAT1~GLAST
Excitatory amino acid transporter 2|85|A major astrocytic glutamate transporter.|EAAT2~GLT-1
Excitatory amino acid transporter 3|85|A neuronal glutamate transporter.|EAAT3~EAAC1
@transmitter-enzymes|Name an enzyme that synthesizes or metabolizes a neurotransmitter or neuromodulator.|Messenger biochemistry|The acetylcholine-clearing enzyme is the gem.|Acetylcholinesterase
Monoamine oxidase|10|An enzyme family metabolizing monoamines.|MAO
Tyrosine hydroxylase|30|Converts tyrosine to L-DOPA in catecholamine synthesis.|TH
Glutamic acid decarboxylase|30|Converts glutamate to GABA.|GAD~glutamate decarboxylase
Choline acetyltransferase|30|Synthesizes acetylcholine from choline and acetyl-CoA.|ChAT
Acetylcholinesterase|100|Hydrolyzes acetylcholine after its release.|AChE
Dopamine beta-hydroxylase|60|Converts dopamine into norepinephrine.|DBH
Tryptophan hydroxylase|60|Catalyzes the rate-limiting step in serotonin synthesis.|TPH
Aromatic L-amino acid decarboxylase|60|Converts L-DOPA to dopamine and 5-HTP to serotonin.|AADC~DOPA decarboxylase
Catechol-O-methyltransferase|60|Methylates catecholamines and their metabolites.|COMT
Histidine decarboxylase|60|Converts histidine to histamine.|HDC
Phenylethanolamine N-methyltransferase|85|Converts norepinephrine to epinephrine.|PNMT
GABA transaminase|85|An enzyme in GABA degradation.|GABA-T
Glutaminase|85|Converts glutamine into glutamate.
Glutamine synthetase|85|Converts glutamate and ammonia into glutamine, prominently in astrocytes.
Nitric oxide synthase|85|Produces nitric oxide from arginine.|NOS
Fatty acid amide hydrolase|85|An enzyme degrading anandamide and related lipids.|FAAH
@second-messengers|Name a molecule or protein in neuronal intracellular second-messenger signaling.|Inside receptor signaling|The familiar ATP-derived second messenger is the gem.|Cyclic AMP
ATP|10|A substrate for kinases and adenylyl cyclase.
Calcium|30|An intracellular signal controlling many neuronal processes.|Ca2+
G protein|30|A guanine-nucleotide-binding signaling protein.
Protein kinase|30|An enzyme that transfers phosphate groups to proteins.
Cyclic AMP|100|An adenylyl-cyclase product that activates PKA and other effectors.|cAMP
Adenylyl cyclase|60|Converts ATP into cyclic AMP.|adenylate cyclase
Protein kinase A|60|A kinase activated by cyclic AMP.|PKA
Phospholipase C|60|Cleaves PIP2 to generate IP3 and DAG.|PLC
Inositol trisphosphate|60|Triggers calcium release from intracellular stores.|IP3~inositol 1,4,5-trisphosphate
Diacylglycerol|60|A membrane-associated signal that helps activate protein kinase C.|DAG
Protein kinase C|85|A kinase family regulated by lipids and, for some members, calcium.|PKC
Calmodulin|85|A calcium-binding protein that regulates multiple enzymes.
CaMKII|85|A calcium/calmodulin-dependent kinase involved in synaptic plasticity.
Guanylyl cyclase|85|Produces cyclic GMP from GTP.
Phosphodiesterase|85|An enzyme family breaking down cyclic nucleotides.|PDE
CREB|85|A transcription factor regulated by phosphorylation in activity-dependent signaling.
@neuron-transport|Name a protein, organelle, or cytoskeletal structure involved in neuronal intracellular transport.|Long-distance cell logistics|The motor walking toward many axon terminals is the gem.|Kinesin
Microtubule|10|A polarized cytoskeletal track used for long-range transport.|microtubules
Mitochondrion|30|An energy-producing organelle transported along axons.|mitochondria
Vesicle|30|A membrane-bound cargo compartment.|transport vesicle
Actin|30|A cytoskeletal protein supporting local trafficking and cell shape.
Kinesin|100|A motor family whose many members support anterograde axonal transport.
Dynein|60|A motor supporting retrograde transport along axonal microtubules.
Tubulin|60|The protein building block of microtubules.
Neurofilament|60|A neuron-enriched intermediate filament contributing axonal structure.
Endosome|60|A membrane compartment transporting and sorting internalized cargo.
Lysosome|60|A degradative organelle participating in neuronal cargo turnover.
Dynactin|85|A complex supporting cytoplasmic dynein activity.
Tau|85|A microtubule-associated protein enriched in axons.
MAP2|85|A microtubule-associated protein enriched in dendrites.
Myosin|85|A motor family supporting movement along actin filaments.
Miro|85|A mitochondrial outer-membrane GTPase involved in organelle transport.
Trak|85|An adaptor linking mitochondria with motor machinery.|Milton
@glial-functions|Name an established function or process performed by glial cells.|Glia at work|The formation of insulating myelin is the gem.|Myelination
Immune surveillance|10|Microglia monitor their tissue environment.
Phagocytosis|30|Glia can engulf debris, cells, or cellular material.
Potassium buffering|30|Astrocytes help control extracellular potassium.|K buffering
Transmitter uptake|30|Glial transporters remove neurotransmitters from extracellular space.|neurotransmitter uptake
Myelination|100|Oligodendrocytes and Schwann cells form insulating myelin.
Glutamine synthesis|60|Astrocytes convert glutamate to glutamine.
Metabolic support|60|Glia supply or regulate substrates supporting neural metabolism.
Synapse elimination|60|Glial cells participate in removing selected synapses.|synaptic pruning
Axon guidance|60|Glial structures can influence developing axonal trajectories.
Blood-brain barrier support|60|Astrocyte interactions help maintain the neurovascular interface.|BBB support
Remyelination|85|Glial lineages can restore myelin after some injuries.
Scar formation|85|Reactive astrocytes participate in scar borders after CNS injury.|glial scar formation
Saltatory conduction support|85|Myelinating glia enable efficient nodal action-potential propagation.
Neurovascular coupling|85|Glial signaling can contribute to matching blood flow to activity.
Water homeostasis|85|Astrocytic aquaporins help regulate water movement in brain tissue.
Iron homeostasis|85|Glial cells help regulate nervous-system iron storage and availability.
@axon-guidance|Name a molecule, receptor, or named cellular structure involved in axon guidance.|Finding the target|The motile tip of a growing axon is the gem.|Growth cone
Axon|10|A growing neuronal projection that navigates toward targets.
Actin|30|A cytoskeletal protein powering growth-cone protrusions.
Filopodium|30|A thin actin-rich growth-cone protrusion.|filopodia
Lamellipodium|30|A sheet-like actin-rich protrusion.|lamellipodia
Growth cone|100|The dynamic sensory and motile tip of a developing axon.
Netrin|60|A guidance-cue family that can attract or repel axons.
Semaphorin|60|A large guidance-cue family with context-dependent effects.
Slit|60|A secreted guidance-cue family often mediating repulsion.
Ephrin|60|A membrane-associated ligand family involved in guidance and mapping.
Eph receptor|60|A receptor tyrosine-kinase family binding ephrins.
DCC|85|A netrin receptor involved in axon attraction and other guidance responses.
Robo|85|A receptor family for Slit guidance cues.
Neuropilin|85|A coreceptor for some semaphorin signals.
Plexin|85|A receptor family transducing semaphorin signals.
Unc5|85|A netrin-receptor family involved in repulsive guidance.
L1CAM|85|A cell-adhesion molecule contributing to axon growth and guidance.|L1 cell adhesion molecule
@embryonic-neural-map|Name an embryonic structure or germ-layer derivative directly involved in nervous-system development.|Building the neural map|The embryonic tube gives rise to the CNS.|Neural tube
Ectoderm|10|The germ layer from which the neural plate arises.
Neural plate|30|A thickened ectodermal sheet that folds into the neural tube.
Neural crest|30|A migratory population producing many peripheral neural cells.
Neural groove|30|A midline depression during neural-tube formation.
Neural tube|100|The embryonic precursor of brain and spinal cord.
Neural fold|60|An elevated neural-plate edge approaching the midline during neurulation.
Prosencephalon|60|The primary forebrain vesicle.|forebrain vesicle
Mesencephalon|60|The primary midbrain vesicle.|midbrain vesicle
Rhombencephalon|60|The primary hindbrain vesicle.|hindbrain vesicle
Telencephalon|60|The secondary vesicle giving rise to cerebral hemispheres.
Diencephalon|85|The secondary vesicle giving rise to thalamic and hypothalamic regions.
Metencephalon|85|The secondary vesicle giving rise to pons and cerebellum.
Myelencephalon|85|The secondary vesicle giving rise to medulla.
Alar plate|85|A dorsal neural-tube region associated with sensory differentiation.
Basal plate|85|A ventral neural-tube region associated with motor differentiation.
Floor plate|85|A ventral midline signaling structure in the neural tube.
@trophic-signals|Name a growth factor, neurotrophin, or receptor involved in neuronal survival or development.|Neuronal growth signals|The classic survival factor discovered through sensory and sympathetic neurons is the gem.|Nerve growth factor
Insulin receptor|10|A receptor tyrosine kinase with developmental and metabolic neural functions.|INSR
Insulin|30|A hormone that also signals in the nervous system.
Brain-derived neurotrophic factor|30|A neurotrophin involved in neuronal survival and synaptic plasticity.|BDNF
Epidermal growth factor|30|A signaling factor that affects some neural progenitors.|EGF
Nerve growth factor|100|A neurotrophin important for selected sensory and sympathetic neurons.|NGF
Neurotrophin 3|60|A neurotrophin supporting particular neuronal populations.|NT-3~NT3
Neurotrophin 4|60|A neurotrophin that activates TrkB.|NT-4~NT4~NT-4/5
Glial cell line-derived neurotrophic factor|60|A trophic factor acting through GFRalpha and RET systems.|GDNF
Fibroblast growth factor 2|60|A growth factor influencing neural progenitor biology.|FGF2~basic FGF
Insulin-like growth factor 1|60|A growth factor involved in growth and neuronal support.|IGF1~IGF-1
TrkA|85|A receptor tyrosine kinase strongly associated with NGF signaling.|NTRK1
TrkB|85|A receptor for BDNF and neurotrophin 4.|NTRK2
TrkC|85|A receptor strongly associated with neurotrophin 3.|NTRK3
p75 neurotrophin receptor|85|A neurotrophin receptor with context-dependent signaling effects.|p75NTR~NGFR
RET|85|A receptor tyrosine kinase used by GDNF-family signals.
Ciliary neurotrophic factor|85|A cytokine-family factor supporting selected neuronal populations.|CNTF
@passive-properties|Name an electrical property, quantity, or passive membrane phenomenon used to describe neurons.|Neurons as electrical circuits|The voltage across a resting membrane is the gem.|Resting membrane potential
Voltage|10|Electrical potential difference between two points.|potential difference
Current|30|The rate of electrical charge flow.
Resistance|30|Opposition to current flow.
Capacitance|30|The ability to store separated electrical charge.
Resting membrane potential|100|The transmembrane voltage of a neuron at rest.|resting potential~RMP
Conductance|60|The reciprocal of electrical resistance.
Input resistance|60|The change in membrane voltage per applied current near an operating point.
Membrane time constant|60|The characteristic charging time of a passive membrane.|time constant~tau
Length constant|60|The distance over which a passive voltage change falls to about one over e.|space constant~lambda
Equilibrium potential|60|The voltage balancing an ion's electrical and chemical driving forces.|Nernst potential
Driving force|85|The difference between membrane voltage and an ion's equilibrium potential.
Reversal potential|85|The voltage where a particular membrane current changes direction.
Electrotonic spread|85|Passive propagation of voltage along a neuronal process.
Axial resistance|85|Resistance to current flow along the cell interior.
Membrane impedance|85|Frequency-dependent opposition to an oscillating current.
Shunting|85|A conductance increase that reduces the impact of other current inputs.|shunting inhibition
@spike-measurements|Name a quantitative measurement of neuronal spiking or excitability.|Measuring neural firing|Counting spikes per second gives this introductory answer.|Firing rate
Spike count|10|The number of detected action potentials in an interval.
Spike amplitude|30|The voltage height of a recorded action potential.
Threshold|30|A voltage or input criterion associated with spike initiation.|spike threshold
Spike latency|30|The delay from a reference event to a spike.
Firing rate|100|The number of spikes per unit time.|spike rate
Interspike interval|60|The time between successive action potentials.|ISI
Spike width|60|A measure of action-potential duration.
Rheobase|60|The minimum sufficiently long current needed to elicit a spike.
Afterhyperpolarization amplitude|60|The size of the negative voltage deflection after a spike.|AHP amplitude
Adaptation ratio|60|A measure comparing firing or intervals across a sustained response.
Coefficient of variation|85|The standard deviation divided by the mean, often applied to ISIs.|CV
Fano factor|85|Spike-count variance divided by mean spike count.
Phase locking value|85|A measure of consistency of spike or signal phase relationships.|PLV
Vector strength|85|A circular measure of spike timing relative to a periodic stimulus.
Spike-triggered average|85|The average stimulus preceding a spike.|STA
Frequency-current curve|85|The relationship between input current and firing rate.|f-I curve~FI curve
@neural-coding|Name a neural coding strategy, spike pattern, or representation concept.|How spikes carry information|An introductory neuron can represent stimulus strength by spike frequency.|Rate coding
Action potential|10|A brief regenerative electrical signal.|spike
Burst|30|A cluster of spikes separated by relatively short intervals.|burst firing
Population coding|30|Information represented across multiple neurons.
Receptive field|30|The stimulus domain influencing a neuron's response.
Rate coding|100|A representation using the number of spikes per unit time.|rate code
Temporal coding|60|A representation using the timing of spikes.|temporal code
Place coding|60|Information represented by the identity or location of active neurons.|place code
Sparse coding|60|A representation in which relatively few units are strongly active.|sparse code
Distributed representation|60|A representation spread across multiple units.
Synchrony|60|Coordinated timing of neural events across units.|synchronous firing
Phase coding|85|Information represented by spike phase relative to an oscillation.|phase code
Latency coding|85|Information represented by response delay.|latency code
Opponent coding|85|A representation based on the difference between opposing channels.|opponent code
Mixed selectivity|85|A neuron responds to combinations of task variables.
Gain modulation|85|One signal scales a neuron's response to another.
Noise correlation|85|Trial-to-trial covariation remaining after stimulus-related means are removed.
@circuit-motifs|Name a recognized neural circuit motif or computation.|Circuit building blocks|One neuron suppressing its neighbors creates this classic effect.|Lateral inhibition
Excitation|10|An influence increasing a target neuron's likelihood of firing.
Inhibition|30|An influence reducing a target neuron's likelihood of firing.
Convergence|30|Multiple inputs project to a shared target.
Divergence|30|One source projects to multiple targets.
Lateral inhibition|100|Activity in one channel suppresses neighboring channels.
Feedforward inhibition|60|An input recruits inhibition onto its downstream targets.
Feedback inhibition|60|Output activity recruits inhibition back onto the producing network.
Disinhibition|60|Inhibiting an inhibitory neuron increases activity in its target.
Recurrent excitation|60|Excitatory neurons feed signals back within a network.
Central pattern generator|60|A network capable of generating patterned rhythmic output.|CPG
Coincidence detection|85|A computation sensitive to near-simultaneous inputs.
Temporal integration|85|A computation accumulating inputs over time.
Winner-take-all|85|Competition allows a strongly active channel to suppress alternatives.|winner take all
Divisive normalization|85|Responses are scaled by pooled activity from a neural population.
Push-pull circuit|85|Opposing excitation and inhibition regulate complementary responses.|push pull
Delay line|85|A pathway imposing a timing offset useful in temporal comparisons.
@plasticity-molecules|Name a molecule or cellular component involved in activity-dependent synaptic plasticity.|Plasticity machinery|The coincidence-sensitive glutamate receptor is the gem.|NMDA receptor
Glutamate|10|An excitatory transmitter involved in many plasticity paradigms.
Calcium|30|An intracellular trigger for many forms of synaptic change.|Ca2+
AMPA receptor|30|Its trafficking changes excitatory synaptic strength.|AMPAR
Dendritic spine|30|A postsynaptic protrusion that can change with experience.
NMDA receptor|100|A glutamate receptor whose calcium entry can trigger plasticity.|NMDAR
CaMKII|60|A calcium/calmodulin-dependent kinase important for many forms of LTP.
CREB|60|An activity-regulated transcription factor linked to lasting memory changes.
BDNF|60|A neurotrophin that supports several forms of synaptic plasticity.|brain-derived neurotrophic factor
Protein kinase A|60|A cAMP-regulated kinase participating in plasticity.|PKA
Calcineurin|60|A calcium-regulated phosphatase involved in synaptic weakening.|PP2B
PSD-95|85|A postsynaptic scaffold organizing excitatory synapses.|DLG4
Arc|85|An activity-regulated protein involved in synaptic regulation.|activity-regulated cytoskeleton-associated protein
Protein phosphatase 1|85|A phosphatase implicated in several plasticity mechanisms.|PP1
TrkB|85|A neurotrophin receptor mediating many BDNF effects.
Actin|85|A cytoskeletal protein supporting changes in dendritic-spine structure.
Endocannabinoid|85|A retrograde lipid signal involved in some forms of synaptic depression.|endocannabinoids
@behavioral-assays|Name a behavioral task or apparatus used in neuroscience research.|Behavior in the lab|A rodent swimming toward a hidden platform is a classic.|Morris water maze
Maze|10|An apparatus for testing navigation, learning, or decision-making.
Open field|30|An arena used to measure locomotion and exploration.|open-field test
Rotarod|30|A rotating rod used to measure motor coordination and learning.|rotarod test
Fear conditioning|30|An associative task pairing a cue or context with an aversive event.
Morris water maze|100|A spatial-learning task with a submerged escape platform.|water maze
Elevated plus maze|60|An apparatus comparing exploration of open and enclosed arms.
Novel object recognition|60|A task using differential exploration of familiar and novel objects.|NOR
Radial arm maze|60|A multi-arm maze used to test spatial memory.
T maze|60|A two-choice maze used in learning and memory tasks.|T-maze
Y maze|60|A three-arm maze often used to assess spontaneous alternation.|Y-maze
Barnes maze|85|A dry circular platform with escape holes used to test spatial learning.
Five-choice serial reaction time task|85|A rodent task measuring attention and response control.|5-CSRTT
Delayed alternation|85|A task requiring alternation across choices separated by a delay.
Conditioned place preference|85|An assay of preference for an environment associated with an outcome.|CPP
Acoustic startle|85|A reflex response to a sudden sound used in sensorimotor assays.|startle test
Prepulse inhibition|85|Reduction in startle when a weak stimulus precedes the startling one.|PPI
@human-memory-tasks|Name a recognized experimental task or test used to study human memory.|Testing memory|Repeating a short list of numbers is the intro-level gem.|Digit span
Free recall|10|Reporting learned items without item-specific retrieval cues.
Recognition test|30|Judging whether an item was encountered before.|recognition memory test
Cued recall|30|Retrieving an item with an associated cue.
Paired-associate learning|30|Learning relationships between paired items.|paired associates
Digit span|100|Repeating digit sequences to assess short-term retention.|digit-span test
N-back|60|Reporting matches to items presented a fixed number of trials earlier.|n back
Delayed match-to-sample|60|Selecting a stimulus matching an earlier sample after a delay.|DMTS
Serial recall|60|Recalling items in their presented order.
Sternberg task|60|A short-term memory-scanning paradigm using a probe after a memory set.|Sternberg memory task
Remember-know task|60|A recognition task distinguishing recollection from familiarity reports.|remember know
Corsi block tapping|85|Reproducing spatial sequences of block taps.|Corsi test
Rey auditory verbal learning test|85|A repeated verbal-list learning and recall test.|RAVLT
California verbal learning test|85|A standardized verbal-learning test with recall and recognition components.|CVLT
Rey-Osterrieth complex figure|85|A figure-copying and visual-memory assessment.|Rey complex figure
Source memory task|85|A task testing memory for an item's context or origin.|source memory
Mnemonic similarity task|85|A recognition task including similar lures to assess mnemonic discrimination.|MST
@conditioning-vocabulary|Name a standard term or process in classical or operant conditioning.|Learning terminology|An originally neutral cue can become this after learning.|Conditioned stimulus
Reward|10|An outcome that can support approach and reinforcement.
Reinforcement|30|A consequence that increases the future likelihood of a behavior.
Punishment|30|A consequence that decreases the future likelihood of a behavior.
Extinction|30|A decline in conditioned responding after expected outcomes stop.
Conditioned stimulus|100|A cue that predicts an outcome after associative learning.|CS
Unconditioned stimulus|60|An event eliciting a response without the relevant prior conditioning.|US~UCS
Conditioned response|60|A response elicited by a learned predictive cue.|CR
Unconditioned response|60|A response elicited by an unconditioned stimulus.|UR~UCR
Positive reinforcement|60|Increasing behavior by presenting a reinforcing outcome.
Negative reinforcement|60|Increasing behavior by removing or preventing an aversive event.
Blocking|85|Prior learning about one cue limits learning about an added cue.
Overshadowing|85|One cue acquires less associative control when trained with a more salient cue.
Spontaneous recovery|85|Return of an extinguished response after time has passed.
Renewal|85|Return of extinguished responding after a context change.
Reinstatement|85|Return of extinguished responding after exposure to the unconditioned stimulus.
Prediction error|85|A difference between an expected and an obtained outcome.
@attention-tasks|Name a task, paradigm, or experimental effect used to study attention or cognitive control.|Attention in experiments|Naming ink color while ignoring the word creates a classic conflict.|Stroop task
Reaction time task|10|A task measuring the time between a stimulus and a response.
Visual search|30|Searching a display for a target among distractors.
Dichotic listening|30|Presenting different auditory streams to the two ears.
Go/no-go task|30|Responding to some stimuli while withholding responses to others.|go no go
Stroop task|100|A task involving interference between word reading and ink-color naming.|Stroop test~Stroop effect
Posner cueing task|60|A spatial-cueing paradigm measuring shifts of attention.|Posner task~spatial cueing
Flanker task|60|A target-response task with nearby compatible or incompatible distractors.|Eriksen flanker task
Stop-signal task|60|A task requiring cancellation of an initiated response.|stop signal
Attentional blink|60|Reduced detection of a second target shortly after a first target.
Inattentional blindness|60|Failure to notice a visible unexpected object during an attention-demanding task.
Change blindness|85|Failure to detect a change across interrupted or altered visual displays.
Inhibition of return|85|Slower orienting back to a previously cued location after a delay.|IOR
Antisaccade task|85|A task requiring a saccade away from a visual cue.|antisaccade
Continuous performance test|85|A sustained-attention task involving responses over a long sequence.|CPT
Psychological refractory period|85|A delay in responding to a second closely timed task.|PRP
Simon effect|85|Response interference caused by irrelevant stimulus location.
@psychophysics|Name a psychophysical method, measure, or law used in sensory research.|Measuring perception|The smallest detectable difference is an introductory classic.|Just-noticeable difference
Threshold|10|A stimulus level associated with a specified detection performance.
Reaction time|30|The interval between a stimulus and a response.|RT
Accuracy|30|The proportion of responses meeting a correctness criterion.
Absolute threshold|30|A stimulus level meeting a specified detectability criterion.
Just-noticeable difference|100|The smallest difference discriminable at a specified performance level.|JND~difference threshold
Weber law|60|The detectable change often scales with baseline stimulus magnitude.|Weber's law
Fechner law|60|A logarithmic relationship proposed between stimulus magnitude and sensation.|Fechner's law
Stevens power law|60|A power relationship between physical and perceived stimulus magnitude.|Stevens' power law
Method of limits|60|A threshold method using ascending and descending stimulus sequences.
Method of constant stimuli|60|A method testing predetermined stimulus levels in varied order.
Method of adjustment|85|A method in which observers adjust a stimulus to a criterion.
Adaptive staircase|85|A procedure changing stimulus difficulty based on responses.|staircase method
Signal detection theory|85|A framework separating sensitivity from response criterion.|SDT
d-prime|85|A standardized sensitivity measure under signal-detection assumptions.|d prime~d'
Psychometric function|85|The relationship between stimulus level and behavioral performance.
Receiver operating characteristic|85|A curve relating hit rates to false-alarm rates across criteria.|ROC
@perception-effects|Name a recognized perceptual illusion or adaptation phenomenon studied in neuroscience.|Perception can surprise|After staring at motion, a still scene can seem to move.|Motion aftereffect
Afterimage|10|A persisting visual percept after a stimulus is removed.
Blind spot filling-in|30|Perceptual completion across the optic-disc blind spot.|blind spot filling in
McGurk effect|30|A speech percept changed by mismatched visual articulation.
Rubber hand illusion|30|An ownership illusion produced by correlated visual and tactile stimulation.
Motion aftereffect|100|Illusory motion after adapting to motion.|waterfall illusion
Muller-Lyer illusion|60|Contextual arrowheads alter the apparent length of lines.|Müller-Lyer illusion
Ponzo illusion|60|Converging context lines change apparent object size.
Ebbinghaus illusion|60|Surrounding circles alter the apparent size of a central circle.
Phi phenomenon|60|Apparent motion can arise from sequentially presented stationary stimuli.
Tilt aftereffect|60|Orientation adaptation shifts the apparent orientation of later patterns.
McCollough effect|85|An orientation-contingent color aftereffect following adaptation.
Ventriloquism effect|85|Visual location influences perceived sound location.
Size-weight illusion|85|Equal-mass objects of different sizes can feel unequally heavy.
Flash-lag effect|85|A moving object can appear ahead of a briefly flashed reference.
Necker cube|85|An ambiguous wireframe figure with alternating perceived depth.
Kanizsa triangle|85|An illusory-contour figure perceived without a complete physical outline.
@language-processes|Name a linguistic process, representation, or speech-language phenomenon studied in neuroscience.|The language toolkit|Speech sounds are organized into these contrastive units.|Phoneme
Speech|10|The production or perception of spoken language.
Reading|30|Extracting language from written symbols.
Semantics|30|The representation and interpretation of meaning.
Syntax|30|The structured organization of words into sentences.
Phoneme|100|A contrastive speech-sound category in a language.
Phonology|60|The organization of speech-sound patterns.
Morphology|60|The organization of meaningful word components.
Lexical access|60|Retrieval of stored word representations.
Prosody|60|Rhythm, stress, and intonation in speech.
Articulation|60|The movements shaping speech sounds.
Semantic priming|85|Processing facilitated by a meaning-related preceding item.
Phonemic restoration|85|Perceptual filling-in of masked or missing speech sounds.
Categorical perception|85|Continuous stimulus changes are perceived through category boundaries.
Lexical decision|85|A task judging whether a letter or sound sequence is a word.
N400|85|An event-related potential sensitive to semantic processing and context.
P600|85|An event-related potential often associated with syntactic processing or reanalysis.
@sleep-circuitry|Name a structure or signaling molecule involved in regulating sleep and wakefulness.|Sleep circuitry|The peptide lost in many cases of type 1 narcolepsy is the gem.|Orexin
Hypothalamus|10|Contains several sleep-wake-regulating populations.
Melatonin|30|A pineal hormone signaling biological night.
Adenosine|30|A neuromodulator associated with accumulated sleep pressure.
Histamine|30|A transmitter associated with wake-promoting hypothalamic neurons.
Orexin|100|A hypothalamic peptide stabilizing wakefulness.|hypocretin
Locus coeruleus|60|A noradrenergic nucleus with state-dependent firing.
Raphe nuclei|60|Contain serotonergic neurons with state-related activity.
Basal forebrain|60|Contains cholinergic and other neurons involved in arousal.
Ventrolateral preoptic nucleus|60|Contains sleep-promoting inhibitory neurons.|VLPO
Tuberomammillary nucleus|60|A source of histaminergic wake-promoting projections.|TMN
Pedunculopontine nucleus|85|A brainstem nucleus participating in arousal and REM-related circuitry.|PPN
Laterodorsal tegmental nucleus|85|Contains cholinergic and other state-related neurons.|LDT
Sublaterodorsal nucleus|85|A pontine region important for REM-related motor atonia.|SLD
Galanin|85|A neuropeptide expressed by some sleep-promoting preoptic neurons.
GABA|85|An inhibitory transmitter used by many sleep-promoting neurons.
Ventromedial medulla|85|Contains descending circuits contributing to REM motor suppression.
@circadian-clock|Name a molecule, structure, environmental cue, or timing concept in mammalian circadian biology.|The daily clock|The hypothalamic clock nucleus is a classic intro answer.|Suprachiasmatic nucleus
Melatonin|10|A hormone whose secretion normally rises during biological night.
Light|30|A major environmental synchronizer of the circadian clock.
Circadian rhythm|30|An approximately daily endogenous rhythm.
Retina|30|Provides light information to the circadian timing system.
Suprachiasmatic nucleus|100|The main hypothalamic circadian pacemaker.|SCN
Zeitgeber|60|An environmental time cue that entrains a biological rhythm.
Entrainment|60|Synchronization of an endogenous rhythm to an external cycle.
Free-running period|60|The intrinsic period measured without rhythmic external time cues.
Phase response curve|60|A function relating cue timing to the resulting clock phase shift.|PRC
Melanopsin|60|A photopigment in intrinsically photosensitive retinal ganglion cells.|OPN4
Retinohypothalamic tract|85|Carries retinal signals to hypothalamic circadian structures.|RHT
CLOCK|85|A transcription-factor component of the molecular circadian clock.
BMAL1|85|A clock transcription factor that partners with CLOCK.|ARNTL
PER|85|A period-protein family participating in clock feedback.|period protein
CRY|85|A cryptochrome-protein family participating in clock feedback.|cryptochrome
REV-ERB alpha|85|A nuclear receptor contributing to molecular-clock regulation.|NR1D1~REV ERB alpha
@neuroendocrine-system|Name a gland, nucleus, vessel system, or hormone in hypothalamic-pituitary signaling.|Neural endocrine control|The posterior-pituitary hormone that retains water is the gem.|Vasopressin
Pituitary gland|10|An endocrine gland controlled by hypothalamic signals.|hypophysis
Hypothalamus|30|Regulates pituitary secretion through neural and hormonal routes.
Oxytocin|30|A hypothalamic hormone released from posterior pituitary terminals.
Growth hormone|30|An anterior-pituitary hormone supporting growth and metabolism.|GH~somatotropin
Vasopressin|100|A hypothalamic hormone promoting renal water retention.|ADH~antidiuretic hormone
Anterior pituitary|60|The endocrine pituitary portion responding to releasing hormones.|adenohypophysis
Posterior pituitary|60|The neural pituitary portion storing and releasing hypothalamic hormones.|neurohypophysis
Hypophyseal portal system|60|Vessels carrying hypothalamic hormones to the anterior pituitary.|pituitary portal system
Corticotropin-releasing hormone|60|Stimulates pituitary ACTH secretion.|CRH~CRF
Adrenocorticotropic hormone|60|A pituitary hormone stimulating the adrenal cortex.|ACTH~corticotropin
Gonadotropin-releasing hormone|85|Stimulates pituitary LH and FSH secretion.|GnRH
Thyrotropin-releasing hormone|85|Stimulates pituitary TSH secretion.|TRH
Somatostatin|85|Inhibits growth-hormone release among other actions.|GHIH
Growth hormone-releasing hormone|85|Stimulates pituitary growth-hormone release.|GHRH
Median eminence|85|A neurovascular interface for hypothalamic releasing hormones.
Supraoptic nucleus|85|Contains magnocellular vasopressin- and oxytocin-producing neurons.|SON
@feeding-signals|Name a hormone, peptide, or neuronal signal involved in hunger, satiety, or energy balance.|Why we eat|The fat-derived satiety hormone is an intro-level gem.|Leptin
Insulin|10|A pancreatic hormone conveying metabolic information to the brain.
Glucose|30|A nutrient signal monitored by some metabolic-sensing neurons.
Ghrelin|30|A stomach-derived hormone that can promote feeding.
Cholecystokinin|30|A gut peptide participating in meal-related satiety.|CCK
Leptin|100|An adipose-derived hormone informing the brain about energy stores.
Neuropeptide Y|60|A hypothalamic peptide that can promote feeding.|NPY
Agouti-related peptide|60|A peptide from hunger-promoting arcuate neurons.|AgRP
Alpha-MSH|60|A POMC-derived melanocortin peptide that can suppress feeding.|alpha melanocyte-stimulating hormone
POMC|60|A peptide precursor expressed by a key arcuate neuron population.|proopiomelanocortin
GLP-1|60|A gut-brain peptide involved in satiety and metabolic regulation.|glucagon-like peptide 1
Peptide YY|85|A gut-derived satiety-related peptide.|PYY
Amylin|85|A pancreatic peptide contributing to satiation.
Orexin|85|A hypothalamic peptide linking arousal with motivated behaviors.|hypocretin
Melanin-concentrating hormone|85|A hypothalamic peptide involved in energy balance and sleep.|MCH
Melanocortin 4 receptor|85|A receptor critical for central energy-balance regulation.|MC4R
GABA|85|A fast inhibitory transmitter released by many AgRP neurons.
@autonomic-targets|Name an organ, tissue, or cell type directly innervated by autonomic neurons.|Autonomic effectors|The radial iris muscle helps dilate the pupil.|Dilator pupillae
Heart|10|Autonomic input changes heart rate and contractile function.
Intestine|30|Autonomic and enteric circuits regulate motility and secretion.|gut
Urinary bladder|30|Autonomic output helps control storage and voiding.|bladder
Sweat gland|30|Receives sympathetic innervation, predominantly cholinergic for eccrine glands.|sweat glands
Dilator pupillae|100|An iris muscle activated by sympathetic pathways to dilate the pupil.|pupil dilator muscle
Sphincter pupillae|60|An iris muscle activated by parasympathetic pathways to constrict the pupil.|pupil sphincter muscle
Ciliary muscle|60|Parasympathetic activation supports near accommodation.
Salivary gland|60|Autonomic input regulates salivary secretion.|salivary glands
Lacrimal gland|60|Parasympathetic pathways stimulate tear secretion.
Arrector pili muscle|60|Sympathetic activation raises hairs.|arrector pili
Adrenal chromaffin cell|85|Receives preganglionic sympathetic input and secretes catecholamines.|chromaffin cell
Vascular smooth muscle|85|Sympathetic innervation regulates tone in many vessels.
Bronchial smooth muscle|85|Autonomic pathways influence airway caliber.
Detrusor muscle|85|Parasympathetic activation promotes bladder-wall contraction.|detrusor
Internal urethral sphincter|85|Smooth muscle contributing to urinary storage.
Adipocyte|85|Sympathetic signaling regulates lipolysis and thermogenic activity.|fat cell
@neuro-exam|Name a recognized component or maneuver of a clinical neurological examination.|The bedside exam|Tapping a tendon tests a familiar spinal circuit.|Deep tendon reflex test
Mental status examination|10|Assesses cognition, orientation, and related functions.|mental status exam
Visual field test|30|Assesses the regions of space visible to an individual.|confrontation visual fields
Pupillary light reflex test|30|Assesses pupil responses to illumination.|pupil light test
Muscle strength testing|30|Assesses voluntary force generation.|power testing
Deep tendon reflex test|100|Tendon percussion assesses stretch-reflex pathways.|tendon reflex testing~reflex hammer test
Romberg test|60|Assesses standing stability with visual input removed.
Finger-to-nose test|60|Assesses upper-limb coordination.|finger nose test
Heel-to-shin test|60|Assesses lower-limb coordination.|heel shin test
Tandem gait|60|Heel-to-toe walking assesses balance and coordination.
Plantar response|60|Stimulation of the sole assesses a cutaneous reflex.|Babinski test
Pronator drift|85|An outstretched-arm maneuver sensitive to subtle motor pathway deficits.
Rapid alternating movements|85|Assesses rapid switching between opposing actions.|dysdiadochokinesia test
Graphesthesia test|85|Tests recognition of symbols traced on the skin.|graphesthesia
Stereognosis test|85|Tests recognition of an object by touch.|stereognosis
Hoffmann sign test|85|A finger-flick maneuver assessing an upper-limb reflex response.|Hoffman test
Head impulse test|85|Tests high-frequency vestibulo-ocular reflex function.|head thrust test
@movement-disorders|Name a neurological disorder in which abnormal movement or impaired motor control is a major feature.|Clinical movement disorders|Loss of nigrostriatal dopamine is central to this intro classic.|Parkinson disease|clinical
Essential tremor|10|A movement disorder characterized primarily by action tremor.
Huntington disease|30|An inherited neurodegenerative disorder often producing chorea.|Huntington's disease
Tourette syndrome|30|A neurodevelopmental disorder involving motor and vocal tics.|Tourette's syndrome
Cerebral palsy|30|A group of persistent movement and posture disorders from early brain disturbance.|CP
Parkinson disease|100|A neurodegenerative disorder featuring bradykinesia and other motor signs.|Parkinson's disease
Dystonia|60|A disorder category marked by sustained or intermittent abnormal contractions.
Wilson disease|60|A copper-metabolism disorder that can cause movement abnormalities.|Wilson's disease
Multiple system atrophy|60|A neurodegenerative disorder involving autonomic failure and motor dysfunction.|MSA
Progressive supranuclear palsy|60|A tauopathy often involving falls and impaired vertical gaze.|PSP
Spinocerebellar ataxia|60|An inherited disease group with progressive cerebellar dysfunction.|SCA
Friedreich ataxia|85|An inherited disorder causing progressive ataxia and other systemic features.|Friedreich's ataxia
Corticobasal syndrome|85|A clinical syndrome combining asymmetric motor and cortical dysfunction.|CBS
Stiff-person syndrome|85|A disorder involving stiffness and stimulus-sensitive spasms.|stiff person syndrome
Myoclonus-dystonia|85|A syndrome combining myoclonic jerks with dystonia.
Ataxia-telangiectasia|85|A genetic disorder involving ataxia, immune abnormalities, and telangiectasia.|AT
Paroxysmal kinesigenic dyskinesia|85|Brief movement attacks commonly triggered by sudden voluntary movement.|PKD
@degeneration-proteins|Name a protein or peptide strongly associated with a named neurodegenerative disease or its pathology.|Proteins in neurodegeneration|The microtubule-associated tangle protein is the gem.|Tau
Amyloid beta|10|A peptide accumulating in Alzheimer-associated plaques.|A-beta~Aβ~beta amyloid
Alpha-synuclein|30|A protein associated with Lewy bodies and synucleinopathies.|alpha synuclein~SNCA
Huntingtin|30|A protein whose expanded polyglutamine form causes Huntington disease.|HTT
Prion protein|30|A protein whose misfolding underlies prion diseases.|PrP
Tau|100|A microtubule-associated protein accumulating in several tauopathies.|MAPT
TDP-43|60|An RNA-binding protein mislocalized in many ALS and frontotemporal cases.|TARDBP
SOD1|60|An antioxidant enzyme whose variants can cause familial ALS.
FUS|60|An RNA-binding protein linked to a subset of ALS cases.
Amyloid precursor protein|60|A membrane protein cleaved to generate amyloid-beta peptides.|APP
Presenilin 1|60|A gamma-secretase component linked to familial Alzheimer disease.|PSEN1
Presenilin 2|85|A gamma-secretase component linked to familial Alzheimer disease.|PSEN2
LRRK2|85|A kinase whose variants can cause familial Parkinson disease.
Parkin|85|An E3 ubiquitin ligase linked to recessive Parkinson disease.|PRKN
PINK1|85|A mitochondrial kinase linked to recessive Parkinson disease.
Ataxin 1|85|A protein whose polyglutamine expansion causes spinocerebellar ataxia type 1.|ATXN1
Ataxin 3|85|A protein whose polyglutamine expansion causes spinocerebellar ataxia type 3.|ATXN3
@epilepsy-concepts|Name a recognized seizure type, epilepsy-related event, or electrographic seizure phenomenon.|Seizure science|The brief generalized staring seizure is the gem.|Absence seizure
Seizure|10|A transient event from abnormal excessive or synchronous neuronal activity.
Tonic-clonic seizure|30|A seizure with tonic stiffening followed by clonic jerking.|tonic clonic seizure
Focal seizure|30|A seizure originating within networks limited to one hemisphere.
Generalized seizure|30|A seizure rapidly engaging bilaterally distributed networks.
Absence seizure|100|A generalized seizure with brief impairment of awareness and characteristic EEG features.|absence
Myoclonic seizure|60|A seizure producing brief shock-like muscle jerks.
Atonic seizure|60|A seizure producing sudden loss of muscle tone.
Tonic seizure|60|A seizure with sustained muscle contraction.
Clonic seizure|60|A seizure with repetitive rhythmic jerking.
Status epilepticus|60|A prolonged seizure or repeated seizures without appropriate recovery.
Epileptic spasm|85|A brief flexion, extension, or mixed contraction, often in clusters.|infantile spasm
Aura|85|A subjective ictal symptom that may itself be a focal seizure.
Postictal state|85|An altered state following a seizure.|postictal period
Interictal spike|85|A brief epileptiform EEG transient between seizures.
Spike-and-wave discharge|85|An EEG pattern with spikes followed by slow waves.|spike and wave
Todd paresis|85|Transient focal weakness following a seizure.|Todd paralysis~Todd's paralysis
@localization-syndromes|Name a recognized neurological syndrome or deficit used in lesion localization.|Where is the lesion?|Damage to motor pathways can cause this classic plantar sign.|Babinski sign
Hemiparesis|10|Weakness affecting one side of the body.
Aphasia|30|An acquired impairment of language.
Hemianopia|30|Loss of half the visual field.|hemianopsia
Hemispatial neglect|30|Reduced awareness or response to one side of space.|hemineglect
Babinski sign|100|An extensor plantar response suggesting corticospinal pathway dysfunction.|extensor plantar response
Broca aphasia|60|A nonfluent aphasia classically linked to dominant frontal damage.|Broca's aphasia
Wernicke aphasia|60|A fluent aphasia with impaired comprehension.|Wernicke's aphasia
Conduction aphasia|60|An aphasia typically marked by impaired repetition.
Horner syndrome|60|A syndrome including miosis and ptosis from sympathetic pathway disruption.|Horner's syndrome
Brown-Sequard syndrome|60|A spinal hemisection syndrome with dissociated motor and sensory deficits.|Brown-Séquard syndrome
Internuclear ophthalmoplegia|85|Impaired horizontal eye coordination from medial longitudinal fasciculus injury.|INO
Wallenberg syndrome|85|A lateral medullary syndrome with characteristic crossed sensory findings.|lateral medullary syndrome
Weber syndrome|85|A ventral midbrain syndrome combining ipsilateral oculomotor palsy and contralateral weakness.|Weber's syndrome
Balint syndrome|85|A syndrome of simultanagnosia, optic ataxia, and ocular apraxia.|Bálint syndrome
Gerstmann syndrome|85|A syndrome including finger agnosia, agraphia, acalculia, and left-right confusion.
Locked-in syndrome|85|Severe paralysis with preserved consciousness, often from ventral pontine injury.|locked in syndrome
@neuro-drug-mechanisms|Name a drug or compound commonly used to illustrate a neural receptor or transmitter mechanism.|Pharmacology in neuroscience|The caffeine molecule blocks an intro-course sleep-pressure signal.|Caffeine
Nicotine|10|An agonist at nicotinic acetylcholine receptors.
Alcohol|30|Ethanol affects multiple targets, including inhibitory and excitatory transmission.|ethanol
Morphine|30|An opioid receptor agonist used to illustrate analgesic mechanisms.
Cocaine|30|Blocks monoamine transporters, including the dopamine transporter.
Caffeine|100|An adenosine-receptor antagonist that promotes wakefulness.
Atropine|60|A muscarinic acetylcholine-receptor antagonist.
Muscimol|60|A GABA-A receptor agonist used in research.
Bicuculline|60|A GABA-A receptor antagonist used in research.
Ketamine|60|An NMDA-receptor antagonist with additional actions.
Fluoxetine|60|A selective serotonin-reuptake inhibitor.
CNQX|85|An antagonist at AMPA and kainate receptors.
APV|85|An NMDA-receptor antagonist used in experiments.|AP5~D-AP5
Scopolamine|85|A muscarinic receptor antagonist often used in memory studies.
Haloperidol|85|A dopamine D2-family receptor antagonist.
L-DOPA|85|A dopamine precursor that can cross the blood-brain barrier.|levodopa
Physostigmine|85|An acetylcholinesterase inhibitor.
@neurotoxins|Name a toxin or toxicant with a well-characterized nervous-system target or effect.|Neural targets of toxins|The pufferfish sodium-channel blocker is the gem.|Tetrodotoxin
Lead|10|A toxic metal with damaging effects on the developing nervous system.
Mercury|30|Some chemical forms cause substantial nervous-system toxicity.|methylmercury
Botulinum toxin|30|Cleaves SNARE proteins and blocks transmitter release.|botox
Tetanus toxin|30|Disrupts inhibitory transmission through vesicle-release protein cleavage.|tetanospasmin
Tetrodotoxin|100|Blocks many voltage-gated sodium channels.|TTX
Saxitoxin|60|A marine toxin blocking voltage-gated sodium channels.|STX
Alpha-bungarotoxin|60|Binds selected nicotinic acetylcholine receptors.|alpha bungarotoxin
Strychnine|60|An antagonist of inhibitory glycine receptors.
Batrachotoxin|60|Alters voltage-gated sodium-channel gating.
Conotoxin|60|A cone-snail peptide family targeting channels and receptors.|conotoxins
Domoic acid|85|An excitotoxic glutamate-receptor agonist produced by certain algae.
Kainic acid|85|A kainate-receptor agonist used in excitotoxicity and seizure research.|kainate
MPTP|85|A compound metabolized to a toxin damaging nigrostriatal dopamine neurons.
6-Hydroxydopamine|85|A catecholaminergic neurotoxin used in animal research.|6-OHDA
Ibotenic acid|85|An excitatory amino-acid agonist used to create experimental lesions.
Brevetoxin|85|A marine toxin that alters sodium-channel function.
@model-organisms|Name an animal used as a model organism in neuroscience research.|Neuroscience across species|The giant axon made this invertebrate an introductory classic.|Squid
Mouse|10|A mammalian model with extensive genetic tools.|Mus musculus
Rat|30|A rodent used in behavior, physiology, and disease models.|Rattus norvegicus
Fruit fly|30|An invertebrate model with powerful genetics and mapped neural circuits.|Drosophila~Drosophila melanogaster
Zebrafish|30|A vertebrate model with optically accessible larval brains.|Danio rerio
Squid|100|Its giant axon helped establish action-potential mechanisms.
Caenorhabditis elegans|60|A nematode model with a highly characterized nervous system.|C elegans~C. elegans
Aplysia|60|A sea-slug model central to studies of cellular learning mechanisms.|sea hare
Xenopus|60|A frog model used in development and synaptic studies.|African clawed frog
Crayfish|60|A model used to study identified neurons and motor circuits.
Leech|60|An invertebrate model with accessible identified neurons.
Lamprey|85|A vertebrate model for locomotor central pattern generators.
Barn owl|85|A model for auditory spatial localization.
Songbird|85|A model for vocal learning and neural sequence production.|zebra finch
Ferret|85|A mammalian model used in visual and cortical development research.
Marmoset|85|A small primate model used in systems and cognitive neuroscience.
Rhesus macaque|85|A primate model used in sensory, motor, and cognitive research.|Macaca mulatta
@neural-preparations|Name a preparation, cultured cell model, or experimental tissue setup used in neuroscience.|Preparing an experiment|A thin living piece of brain can preserve local circuitry.|Acute brain slice
Whole animal|10|An intact organism used to investigate neural function.
Cell culture|30|Cells maintained outside the organism under controlled conditions.
Brain organoid|30|A three-dimensional stem-cell-derived neural tissue model.|cerebral organoid
Primary neuron culture|30|Neurons isolated from tissue and maintained in vitro.
Acute brain slice|100|A freshly cut living tissue section used for circuit and cellular experiments.|acute slice
Organotypic slice culture|60|A tissue slice maintained long-term while retaining some local organization.
Dissociated neuron culture|60|Separated neurons grown on a substrate or in a matrix.
Induced pluripotent stem cell|60|A reprogrammed cell that can be differentiated into neural lineages.|iPSC
Synaptosome|60|An isolated nerve-terminal preparation.
Isolated retina|60|A retinal tissue preparation preserving substantial local circuitry.|retinal wholemount
Spinal cord preparation|85|An isolated or exposed cord preparation used to study spinal circuits.
Neuromuscular preparation|85|A preparation retaining a motor nerve and its target muscle.
Oocyte expression system|85|A system using oocytes to study expressed channels and receptors.|Xenopus oocyte
Outside-out patch|85|An excised membrane patch exposing its extracellular face to the bath.|outside out patch
Inside-out patch|85|An excised membrane patch exposing its intracellular face to the bath.|inside out patch
Perfused brain preparation|85|A brain maintained with circulating perfusate for physiological experiments.
@microscopy-methods|Name a microscopy method used to examine nervous-system cells or tissue.|Seeing the nervous system|Optical sectioning with a pinhole is an intro-level method.|Confocal microscopy|microscopy
Light microscopy|10|Uses visible light to examine specimens.|optical microscopy
Electron microscopy|30|Uses electrons for high-resolution imaging.|EM
Fluorescence microscopy|30|Detects light emitted by fluorescent labels.
Two-photon microscopy|30|Uses nonlinear excitation to image labeled tissue.|two photon imaging
Confocal microscopy|100|Uses spatial filtering to reject out-of-focus light.|confocal
Transmission electron microscopy|60|Images electrons transmitted through a thin specimen.|TEM
Scanning electron microscopy|60|Images surface-related signals from a scanning electron beam.|SEM
Light-sheet microscopy|60|Illuminates a thin plane to image fluorescent samples efficiently.|light sheet microscopy
Phase-contrast microscopy|60|Converts phase shifts into image contrast.|phase contrast
Differential interference contrast|60|Uses interference to visualize optical-path differences.|DIC~Nomarski microscopy
STED microscopy|85|Uses stimulated emission depletion for subdiffraction fluorescence imaging.|STED
STORM|85|A single-molecule localization microscopy method.
PALM|85|A localization method based on photoactivatable fluorescent molecules.
Expansion microscopy|85|Physically enlarges a labeled sample before optical imaging.
Serial block-face electron microscopy|85|Repeatedly images a block surface after section removal.|SBF-SEM
Focused ion beam SEM|85|Combines ion milling with serial electron imaging.|FIB-SEM
@neural-labeling|Name a stain, labeling method, or histological method used on neural tissue.|Making cells visible|The sparse stain that reveals whole neuron shapes is the gem.|Golgi stain
Hematoxylin and eosin|10|A general tissue stain showing nuclei and cytoplasmic structure.|H&E
Nissl stain|30|Labels ribosome-rich cell bodies for cytoarchitecture.|Nissl staining
Immunohistochemistry|30|Uses antibodies to localize molecules in tissue.|IHC
Fluorescent protein labeling|30|Expresses fluorescent proteins to mark cells or structures.|GFP labeling
Golgi stain|100|Sparsely labels neurons to reveal their morphology.|Golgi staining
Luxol fast blue|60|A stain commonly used to visualize myelin.|LFB
In situ hybridization|60|Detects selected nucleic-acid sequences within tissue.|ISH
Silver stain|60|A family of methods using silver deposition to reveal neural structures.|silver staining
Anterograde tracing|60|Labels projections from neuronal somata toward axonal targets.
Retrograde tracing|60|Labels neurons projecting to an injected target region.
Biocytin filling|85|An intracellular labeling method for reconstructing recorded neurons.|biocytin
Fluoro-Jade|85|A fluorescent stain used to detect degenerating neurons.
TUNEL|85|Labels DNA strand breaks, often used in studies of cell death.
EdU labeling|85|Labels newly synthesized DNA to study cell proliferation.|EdU
BrdU labeling|85|A thymidine-analog method for labeling DNA synthesis.|BrdU
CLARITY|85|A hydrogel-based tissue-clearing approach for three-dimensional imaging.
@electrophysiology-tools|Name a neural electrophysiology recording technique or electrode configuration.|Listening to neurons|Sealing a tiny pipette onto membrane gives this classic method.|Patch clamp|electrodes
EEG|10|Records electrical potential differences at the scalp.|electroencephalography
Intracellular recording|30|Measures voltage from inside a cell.
Extracellular recording|30|Measures electrical signals from outside cells.
Voltage clamp|30|Holds membrane voltage while measuring current.
Patch clamp|100|Uses a high-resistance pipette seal to record membrane signals.|patch-clamp
Current clamp|60|Injects current while measuring membrane voltage.
Whole-cell recording|60|A patch configuration providing electrical access to the cell interior.|whole cell recording
Cell-attached recording|60|A patch configuration recording through an intact membrane patch.|cell attached recording
Local field potential|60|An extracellular signal reflecting pooled local electrical activity.|LFP
Electrocorticography|60|Records electrical activity from the cortical surface.|ECoG
Sharp-electrode recording|85|Intracellular recording with a fine, high-resistance electrode.|sharp electrode
Perforated patch|85|A configuration using membrane pores to gain electrical access with less dialysis.
Juxtacellular recording|85|Records near a single soma and can support targeted labeling.
Tetrode recording|85|Uses four nearby electrode channels to aid unit discrimination.|tetrode
Multi-electrode array|85|Records signals from many spatially distributed electrode sites.|MEA~multielectrode array
Neuropixels|85|A high-density silicon probe technology for extracellular recordings.
@brain-imaging|Name a brain-imaging method, acquisition type, or measurable imaging contrast.|Images of the brain|The blood-oxygen-dependent contrast is an intro-course gem.|BOLD
CT|10|Uses X-rays to reconstruct brain anatomy.|computed tomography
Structural MRI|30|Uses magnetic resonance to image tissue structure.|anatomical MRI
PET|30|Images the distribution of positron-emitting tracers.|positron emission tomography
fMRI|30|Uses magnetic resonance to measure activity-related signals.|functional MRI
BOLD|100|A blood-oxygen-level-dependent MRI contrast linked indirectly to neural activity.|blood oxygen level dependent
Diffusion MRI|60|Measures water diffusion to assess tissue microstructure.
Arterial spin labeling|60|Uses magnetically labeled blood water to estimate perfusion.|ASL
Magnetic resonance spectroscopy|60|Measures spectra associated with tissue metabolites.|MRS
T1 weighting|60|An MRI contrast influenced by longitudinal relaxation.|T1 weighted MRI
T2 weighting|60|An MRI contrast influenced by transverse relaxation.|T2 weighted MRI
FLAIR|85|An MRI sequence suppressing much of the free-fluid signal.
Susceptibility-weighted imaging|85|An MRI approach sensitive to magnetic susceptibility differences.|SWI
Diffusion tensor imaging|85|Models directional diffusion with a tensor.|DTI
Functional near-infrared spectroscopy|85|Uses light to estimate cortical hemodynamic changes.|fNIRS
SPECT|85|Images gamma-emitting tracer distributions.|single photon emission computed tomography
MR angiography|85|Uses magnetic resonance methods to visualize vessels.|MRA
@fmri-analysis|Name a standard concept, artifact, design, or analysis step in fMRI research.|Interpreting fMRI|A neural event produces a delayed vascular response.|Hemodynamic response
Voxel|10|A three-dimensional image element.
Time series|30|Signal measurements ordered over successive time points.
Block design|30|An experimental design grouping similar conditions into blocks.
Event-related design|30|A design modeling individual task events.|event related design
Hemodynamic response|100|The delayed blood-flow and oxygenation response associated with neural activity.|HRF~hemodynamic response function
Repetition time|60|The interval between repeated acquisitions in an MRI sequence.|TR
Motion correction|60|An alignment procedure reducing effects of head movement.
Spatial normalization|60|Mapping individual brain images into a shared reference space.
General linear model|60|A regression framework commonly used to estimate task-related signal changes.|GLM
Resting-state connectivity|60|Statistical dependence among regional signals measured without an explicit task.
Slice timing correction|85|Adjustment for different acquisition times across slices.
Spatial smoothing|85|Combining nearby voxel signals with a spatial kernel.
Multiple-comparison correction|85|A procedure controlling errors across many statistical tests.
Independent component analysis|85|A decomposition seeking statistically independent signal components.|ICA
Global signal|85|An aggregate time series estimated across much of the brain.
Susceptibility artifact|85|Image distortion or signal loss caused by local magnetic field differences.
@neural-perturbation|Name a method used experimentally to manipulate neural activity or nervous-system function.|Testing causality|Light-sensitive proteins let scientists control selected neurons.|Optogenetics|perturbation
Electrical stimulation|10|Applies electrical current to influence neural activity.
Lesion|30|Removes or damages tissue to study consequences.|lesion experiment
TMS|30|Uses time-varying magnetic fields to influence cortical activity.|transcranial magnetic stimulation
Drug microinjection|30|Delivers a compound locally to manipulate neural function.
Optogenetics|100|Uses genetically introduced light-sensitive proteins to manipulate cells.
Chemogenetics|60|Uses engineered molecular systems to control cell activity.
DREADD|60|An engineered receptor system used in chemogenetic manipulation.|designer receptor exclusively activated by designer drugs
Deep brain stimulation|60|Delivers electrical stimulation through implanted deep electrodes.|DBS
Transcranial direct current stimulation|60|Applies weak direct current through scalp electrodes.|tDCS
Cooling|60|Local temperature reduction can reversibly suppress neural function.|cryoinactivation
Channelrhodopsin|85|A light-gated cation channel used for neural activation.|ChR2
Halorhodopsin|85|A light-driven chloride pump used to suppress activity.|NpHR
Archaerhodopsin|85|A light-driven proton pump used in optogenetic inhibition.|Arch
Tetanus toxin light chain|85|Blocks synaptic release by cleaving vesicle fusion machinery.|TeLC
RNA interference|85|Reduces selected gene expression through sequence-specific RNA mechanisms.|RNAi
CRISPR interference|85|Uses targeted inactive Cas machinery to repress gene transcription.|CRISPRi
@molecular-tools|Name a molecular or genetic tool used to label, measure, or manipulate nervous-system cells.|Genes as research tools|A fluorescent jellyfish protein became a classic cell label.|GFP|imaging
PCR|10|Amplifies selected DNA sequences.|polymerase chain reaction
DNA sequencing|30|Determines the nucleotide sequence of DNA.
Viral vector|30|A modified virus used to deliver genetic cargo.
Transgenic animal|30|An animal carrying introduced genetic material.
GFP|100|A green fluorescent protein used to label cells and structures.|green fluorescent protein
Cre recombinase|60|An enzyme used for site-specific genetic recombination.|Cre
LoxP|60|A DNA recognition site used by Cre recombinase.
CRISPR-Cas9|60|A programmable system for targeted genome modification.|CRISPR~Cas9
GCaMP|60|A genetically encoded fluorescent calcium indicator.
AAV|60|A commonly used viral vector platform.|adeno-associated virus
Flp recombinase|85|A site-specific recombinase used in genetic targeting.|Flp
Tet-On|85|A tetracycline-responsive system for inducible gene expression.|Tet On
Brainbow|85|A multicolor genetic labeling strategy for neurons.
RNA sequencing|85|A sequencing approach measuring transcript abundance.|RNA-seq
In situ sequencing|85|Reads nucleic-acid sequence information within preserved tissue.
Barcoded tracing|85|Uses molecular identifiers to distinguish neuronal projections or lineages.
@cell-identification|Name a feature or measurement used to classify neuronal cell types.|What kind of neuron?|A neuron's branching shape provides a classic clue.|Morphology|atlas
Brain region|10|Anatomical location provides context for cell identity.
Neurotransmitter|30|The principal released transmitter is a useful classification feature.
Firing pattern|30|Responses such as bursting or regular spiking help characterize cells.
Projection target|30|The destination of axons distinguishes projection classes.
Morphology|100|Cell-body, dendritic, and axonal shape help define cell classes.
Gene expression|60|RNA abundance patterns distinguish molecular cell populations.|transcriptome
Protein marker|60|A detected protein can identify a subset of cells.
Laminar position|60|Cortical layer location helps distinguish cell classes.
Receptor expression|60|The set of expressed receptors contributes to cell identity.
Developmental lineage|60|A cell's developmental origin can define related populations.
Chromatin accessibility|85|Accessible regulatory DNA provides an epigenetic cell-type signature.
DNA methylation|85|Methylation patterns can distinguish neural cell populations.
Patch-seq|85|Combines electrophysiology, morphology, and single-cell transcriptomics.
Single-cell RNA sequencing|85|Measures transcript profiles from individual cells.|scRNA-seq
Single-nucleus RNA sequencing|85|Profiles RNA from isolated cell nuclei.|snRNA-seq
Spatial transcriptomics|85|Measures gene expression while preserving spatial information.
@neural-statistics|Name a statistical measure or analysis method used in neuroscience data analysis.|Reasoning from data|A value describing how two variables vary together is the gem.|Correlation
Mean|10|The arithmetic average of a set of values.|average
Median|30|The middle value of an ordered dataset.
Standard deviation|30|A measure of spread around the mean.|SD
Variance|30|The mean squared deviation under a specified convention.
Correlation|100|A measure of association between variables.
Linear regression|60|Models a response as a weighted linear combination of predictors.
ANOVA|60|A framework comparing modeled sources of variance.|analysis of variance
Confidence interval|60|An interval from a procedure with a specified long-run coverage rate.|CI
Permutation test|60|A test based on rearrangements allowed under a null hypothesis.
Bootstrap|60|A resampling procedure used to estimate sampling variability.|bootstrapping
Principal component analysis|85|Finds orthogonal directions capturing successive variance.|PCA
Cross-validation|85|Evaluates a model on data separated from its fitting data.
False discovery rate|85|The expected proportion of false rejections among rejected hypotheses.|FDR
Bayesian inference|85|Updates distributions over hypotheses using observed data.
Mixed-effects model|85|A model combining population-level and grouped random effects.|multilevel model
Mutual information|85|A measure of statistical dependence between variables.
@computational-models|Name a named model, model family, or formal framework used in computational neuroscience.|Models of neurons and learning|A membrane voltage reaching threshold can trigger a reset in this classic model.|Integrate-and-fire model
Artificial neural network|10|A computational network of interconnected units.|neural network~ANN
Hodgkin-Huxley model|30|A conductance-based model of action-potential generation.|Hodgkin Huxley
Perceptron|30|A simple weighted-input model with a decision rule.
Reinforcement learning|30|A framework for learning actions from outcomes.
Integrate-and-fire model|100|A model integrating inputs until a spike threshold is reached.|integrate and fire~LIF
Cable theory|60|A framework describing electrical spread in extended cell processes.
Hopfield network|60|A recurrent network model with attractor dynamics.
Rescorla-Wagner model|60|An associative-learning model driven by prediction error.|Rescorla Wagner
Temporal-difference learning|60|A learning rule based on successive reward predictions.|TD learning
Drift-diffusion model|60|A noisy evidence-accumulation model of decisions.|DDM
FitzHugh-Nagumo model|85|A reduced dynamical model of excitable membrane behavior.|FitzHugh Nagumo
Izhikevich model|85|A compact spiking model reproducing varied firing patterns.
Wilson-Cowan model|85|A population model of interacting excitatory and inhibitory activity.|Wilson Cowan
Generalized linear model|85|A statistical response model often used for neural spike trains.|GLM
Kalman filter|85|A recursive state estimator used in tracking and neural decoding.
Bayesian observer|85|A model combining prior information and sensory evidence.
@bbb-components|Name a cell, junction, transporter, or structural component associated with the blood-brain barrier or neurovascular unit.|The brain's vascular interface|The sealed contacts between endothelial cells are the gem.|Tight junction|barrier
Capillary|10|A small vessel whose endothelial lining forms the vascular barrier.
Astrocyte|30|A glial cell interacting with brain vessels.
Endothelial cell|30|The vessel-lining cell forming the principal blood-brain barrier.
Basement membrane|30|An extracellular matrix layer around microvessels.|basal lamina
Tight junction|100|A specialized intercellular seal limiting paracellular passage.
Pericyte|60|A mural cell supporting capillary stability and barrier function.
Astrocyte endfoot|60|A glial process contacting the vessel surface.|astrocytic endfoot
Claudin 5|60|A prominent tight-junction protein in brain endothelium.|CLDN5
Occludin|60|A tight-junction-associated membrane protein.
GLUT1|60|A transporter enabling glucose entry across brain endothelium.|SLC2A1
P-glycoprotein|85|An efflux transporter restricting many compounds' brain entry.|ABCB1~P-gp
ZO-1|85|A scaffold linking tight-junction proteins to intracellular structures.|TJP1
Aquaporin 4|85|A water channel enriched in astrocytic perivascular endfeet.|AQP4
MFSD2A|85|A transporter that also helps suppress endothelial transcytosis.
LAT1|85|A transporter carrying large neutral amino acids across the barrier.|SLC7A5
Collagen IV|85|A structural extracellular-matrix protein in vascular basement membranes.
@neuroimmune-signals|Name an immune cell, receptor, cytokine, or immune-related molecule studied in nervous-system biology.|Neuroimmune communication|The resident immune cell of the brain is the gem.|Microglia
Antibody|10|An immune protein that can recognize neural antigens in some diseases.|immunoglobulin
Macrophage|30|A phagocytic immune-cell type present at CNS borders and after injury.
T cell|30|An adaptive immune-cell type that can participate in neurological disease.|T lymphocyte
Interleukin 1 beta|30|A proinflammatory cytokine with neural and immune effects.|IL-1beta~IL-1β
Microglia|100|The principal resident immune-cell population of CNS parenchyma.|microglial cell
Tumor necrosis factor|60|A cytokine affecting inflammation and neural signaling.|TNF~TNF alpha
Interleukin 6|60|A cytokine with context-dependent inflammatory and neural actions.|IL-6
Complement C1q|60|A complement component involved in immune recognition and synapse studies.|C1q
Complement C3|60|A central complement protein implicated in neural immune processes.|C3
Toll-like receptor 4|60|An innate immune receptor studied in microglial activation.|TLR4
TREM2|85|A myeloid-cell receptor linked to microglial biology and disease risk.
CX3CR1|85|A receptor expressed by microglia and other myeloid cells.
Fractalkine|85|A chemokine involved in neuron-microglia communication.|CX3CL1
P2RY12|85|A purinergic receptor associated with homeostatic microglial responses.
NLRP3|85|An inflammasome component studied in neuroinflammation.
Interferon gamma|85|An immune cytokine affecting microglial and neural responses.|IFN gamma~IFN-γ
@motor-learning|Name a task, process, or neural structure studied in motor learning.|Learning to move|The little brain contributes strongly to movement adaptation.|Cerebellum
Practice|10|Repeated performance can improve a motor skill.
Motor cortex|30|Cortical circuits contribute to learning and executing skilled movement.|M1~primary motor cortex
Basal ganglia|30|Participate in reinforcement-driven action learning and habits.
Motor adaptation|30|Adjustment of motor commands to altered conditions.
Cerebellum|100|Contributes to prediction, error-based adaptation, and motor skill learning.
Visuomotor rotation|60|A task perturbing the mapping between hand movement and visual feedback.
Force-field adaptation|60|Learning to compensate for externally applied movement-dependent forces.|force field adaptation
Eyeblink conditioning|60|Learning a blink response to a predictive cue.
Savings|60|Faster relearning after previous experience with a task.
Aftereffect|60|A systematic movement error remaining after a learned perturbation is removed.
Sensory prediction error|85|A mismatch between predicted and observed sensory consequences.
Internal model|85|A representation used to predict or control body-environment interactions.
Forward model|85|A model predicting sensory consequences of a motor command.
Inverse model|85|A model mapping desired outcomes into motor commands.
Use-dependent learning|85|Movement biases shaped by repeated execution of particular actions.
Serial reaction time task|85|A task measuring learning of repeated response sequences.|SRTT
`;

export const EXPANSION = expansionContent.trim().split('\n@').map((block) => {
  const [header, ...rows] = block.replace(/^@/, '').split('\n');
  const [id,prompt,topic,hint,anchor,sourceKey='core'] = header.split('|');
  return {
    id: `expanded-${id}`, prompt, topic, hint, anchor,
    source: EXPANSION_SOURCES[sourceKey],
    answers: rows.filter(Boolean).map(row => {
      const [name,points,explanation,aliases=''] = row.split('|');
      return {name,points:Number(points),explanation,aliases:aliases.split('~').filter(Boolean)};
    })
  };
});
